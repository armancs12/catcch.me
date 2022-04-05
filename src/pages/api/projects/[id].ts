import apiRouter from "@server/api-router";
import { APIRequest } from "@server/api-router/@types";
import { asAuthenticated } from "@server/api-router/middlewares";
import database from "@server/database";
import getDynamicParam from "@server/get-dynamic-param";
import createHttpError from "http-errors";
import { z } from "zod";

const router = apiRouter();
router.use(asAuthenticated);

const updateProjectSchema = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
});

const getProjectOrFail = async (req: APIRequest, id: string) => {
  const project = await database.project.findFirst({
    where: { id, userId: req.getUser().id },
  });

  if (!project) {
    throw createHttpError(404);
  }

  return project;
};

router.get(async (req, res) => {
  const id = getDynamicParam(req, "id");
  const project = await getProjectOrFail(req, id);
  res.json(project);
});

router.put(async (req, res) => {
  const updateProject = await updateProjectSchema.parseAsync(req.body);
  const id = getDynamicParam(req, "id");
  await getProjectOrFail(req, id);

  const project = await database.project.update({
    where: { id },
    data: {
      name: updateProject.name,
      url: updateProject.url,
    },
  });

  res.json(project);
});

router.delete(async (req, res) => {
  const id = getDynamicParam(req, "id");
  await getProjectOrFail(req, id);

  const project = await database.project.delete({
    where: { id },
  });

  res.json(project);
});

export default router;
