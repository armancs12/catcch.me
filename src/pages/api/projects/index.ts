import apiRouter from "@server/api-router";
import { asAuthenticated } from "@server/api-router/middlewares";
import database from "@server/database";
import { z } from "zod";

const router = apiRouter();
router.use(asAuthenticated);

const createProjectSchema = z.object({
  name: z.string(),
  url: z.string().url().optional(),
});

router.get(async (req, res) => {
  const sessionUser = req.getUser();

  const projects = await database.project.findMany({
    where: { userId: sessionUser.id },
  });

  res.json(projects);
});

router.post(async (req, res) => {
  const sessionUser = req.getUser();
  const createProject = await createProjectSchema.parseAsync(req.body);

  const project = await database.project.create({
    data: {
      name: createProject.name,
      url: createProject.url,
      userId: sessionUser.id,
    },
  });

  if (req.url) {
    res.setHeader("Location", `${req.url}/${project.id}`);
  }

  res.status(201).json(project);
});

export default router;
