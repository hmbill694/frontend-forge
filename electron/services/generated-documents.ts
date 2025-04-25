import { Result } from "../../shared/utils/result";
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
      .returning(),
  );

  return res
    .map((ele) => ele.at(0))
    .ifNull("Could not save document")
    .getOrThrow();
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
        and(eq(pages.id, query.docId), eq(pages.projectId, query.projectId)),
      ),
  );

  return res
    .map((ele) => ele.at(0))
    .ifNull("Could not get the requested document")
    .getOrThrow()!!;
}

export async function getGeneratedDocs(query: { projectId: number }) {
  const res = await Result.fromAsync(() =>
    db.select().from(pages).where(eq(pages.projectId, query.projectId)),
  );

  return res.ifNull("Could not get the requested document").getOrThrow()!!;
}
