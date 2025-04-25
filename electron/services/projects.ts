import { Result } from "../../shared/utils/result";
import { db } from "../db/client";
import { InsertProject, projects } from "../db/schema";

export async function getProjects() {
  const res = await Result.fromAsync(() => db.select().from(projects));

  return res.getOrThrow();
}

export async function createProject(request: { name: string }) {
  const now = new Date();

  const valueToInsert: InsertProject = {
    name: request.name,
    createdAt: now,
    updatedAt: now,
  };

  const res = await Result.fromAsync(() =>
    db.insert(projects).values(valueToInsert).returning(),
  );

  return res.map((val) => val.at(0)!!).getOrThrow();
}
