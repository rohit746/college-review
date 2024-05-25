import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { colleges } from "~/server/db/schema";

interface PageProps {
  params: {
    collegeId: string;
  };
}

export default async function CollegePage({ params }: PageProps) {
  const { collegeId } = params;

  if (!collegeId) return notFound();

  const [college] = await db
    .select()
    .from(colleges)
    .where(eq(colleges.id, collegeId));

  if (!college) return notFound();

  return <h1>{college.name}</h1>;
}
