import { Index } from "@upstash/vector";
import { vectorize } from "~/lib/vectorize";
import { db } from "~/server/db";

export async function VectorizeColleges() {
  const colleges = await db.query.colleges.findMany({
    with: {
      reviews: true,
    },
  });
  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  for (const college of colleges) {
    await index.upsert({
      id: college.id,
      vector: await vectorize(`${college.name}: ${college.location}`),
      metadata: {
        id: college.id,
        name: college.name,
        image: college.image,
        location: college.location,
        reviews: college.reviews,
      },
    });
  }
}

void VectorizeColleges();
