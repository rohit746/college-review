import { db } from "./db";

export async function getColleges() {
  const colleges = await db.query.colleges.findMany({
    orderBy: (model, { asc }) => asc(model.id),
  });

  return colleges;
}
