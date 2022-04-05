import apiRouter from "@server/api-router";
import { APIRequest } from "@server/api-router/@types";
import { asAuthenticated } from "@server/api-router/middlewares";
import getDynamicParam from "@server/get-dynamic-param";
import database from "@server/database";
import createHttpError from "http-errors";
import { z } from "zod";
import { ProjectLogType } from "@prisma/client";

const router = apiRouter();
router.use(asAuthenticated);

const createLogSchema = z.object({
  type: z.enum(["info", "warning", "error"]),
  message: z.string(),
  stack: z.string().optional(),
  additionalInfo: z.string().optional(),
});

router.get(async (req, res) => {
  const projectId = getDynamicParam(req, "id");
  const userId = req.getUser().id;

  const logs = await database.projectLog.findMany({
    where: {
      projectId,
      project: { userId },
    },
  });

  res.json(logs);
});

router.post(async (req, res) => {
  const createLog = await createLogSchema.parseAsync(req.body);
  const user = req.getUser();
  const projectId = getDynamicParam(req, "id");

  const exist = await database.project.findFirst({
    where: { id: projectId, userId: user.id },
  });
  if (!exist) {
    throw createHttpError(404, "Project not found!");
  }

  const log = await database.projectLog.create({
    data: {
      type: createLog.type.toUpperCase() as ProjectLogType,
      message: createLog.message,
      additionalInfo: createLog.additionalInfo,
      stack: createLog.stack,
      projectId,
    },
  });

  return res.json(log);
});

export default router;
