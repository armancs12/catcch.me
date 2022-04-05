import apiRouter from "@server/api-router";
import getDynamicParam from "@server/get-dynamic-param";
import database from "@server/database";
import { asAuthenticated } from "@server/api-router/middlewares";
import { APIRequest } from "@server/api-router/@types";
import createHttpError from "http-errors";

const router = apiRouter();
router.use(asAuthenticated);

const getProjectLogOrFail = async (req: APIRequest, id: string) => {
  const log = await database.projectLog.findFirst({
    where: {
      id,
      project: {
        userId: req.getUser().id,
      },
    },
  });

  if (!log) {
    throw createHttpError(404);
  }

  return log;
};

router.get(async (req, res) => {
  const id = getDynamicParam(req, "log-id");
  const log = await getProjectLogOrFail(req, id);
  res.json(log);
});

router.delete(async (req, res) => {
  const id = getDynamicParam(req, "log-id");
  await getProjectLogOrFail(req, id);

  const log = await database.projectLog.delete({
    where: { id },
  });

  res.json(log);
});

export default router;
