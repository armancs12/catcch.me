import apiRouter from "@server/api-router";
import { asAuthenticated } from "@server/api-router/middlewares";
import database from "@server/database";
import { NotFound } from "http-errors";
import { z } from "zod";

const router = apiRouter();
router.use(asAuthenticated);

const updateProjectSchema = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
});

router.get(async (req, res) => {
  const sessionUser = req.getUser();

  const id = typeof req.query.id === "string" ? req.query.id : req.query.id[0];
  const project = await database.project.findFirst({
    where: { id, userId: sessionUser.id },
  });

  if (!project) {
    throw new NotFound("Project not found!");
  }

  res.json(project);
});

router.put(async (req, res) => {
  const sessionUser = req.getUser();

  const id = typeof req.query.id === "string" ? req.query.id : req.query.id[0];
  const exist = await database.project.findFirst({
    where: { id, userId: sessionUser.id },
  });
  if (!exist) {
    throw new NotFound("Project not found!");
  }

  const updated = await updateProjectSchema.parseAsync(req.body);
  const project = await database.project.update({
    where: { id },
    data: updated,
  });

  res.json(project);
});

router.delete(async (req, res) => {
  const sessionUser = req.getUser();

  const id = typeof req.query.id === "string" ? req.query.id : req.query.id[0];
  const exist = await database.project.findFirst({
    where: { id, userId: sessionUser.id },
  });
  if (!exist) {
    throw new NotFound("Project not found!");
  }

  const project = await database.project.delete({
    where: { id },
  });

  res.json(project);
});

export default router;
