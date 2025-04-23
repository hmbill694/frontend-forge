import { Result } from "../utils/result";
import { db } from "../db/client";
import { pages } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function getGeneratedPages() {
  const res = await Result.fromAsync(() => db.select().from(pages));

  return res.getOrThrow();
}

export async function saveDocument(doc: {
  content: string;
  name: string;
  projectId: number;
}) {
  const res = await Result.fromAsync(() =>
    db
      .insert(pages)
      .values([{ createdAt: new Date(), ...doc }])
      .returning()
  );

  return res.map(ele => ele.at(0)).ifNull("Could not find the requested record").getOrThrow();
}

export async function getGeneratedDoc(query: {
  docId: number;
  projectId: number;
}) {
  const res = await Result.fromAsync(() =>
    db
      .select()
      .from(pages)
      .where(
        and(eq(pages.id, query.docId), eq(pages.projectId, query.projectId))
      )
  );

  return res
    .map((ele) => ele.at(0))
    .ifNull("Could not get the requested document")
    .getOrThrow()!!;
}
