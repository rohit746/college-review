import { db } from "./db";
import { sql } from "drizzle-orm";

export async function SearchColleges(query: string) {
  if (query) {
    const foundColleges = await db.query.colleges.findMany({
      with: {
        reviews: true,
      },
      where: (model) =>
        sql`to_tsvector('simple', lower(${model.name} || ' ' || ${
          model.location
        })) @@ to_tsquery('simple', lower(${query
          .trim()
          .split(" ")
          .join(" & ")}))`,
      limit: 3,
    });

    return foundColleges;
  } else {
    const colleges = await db.query.colleges.findMany({
      with: {
        reviews: true,
      },
      orderBy: (model, { asc }) => asc(model.id),
    });

    return colleges;
  }
}
