import { UserButton } from "@clerk/nextjs";
import { FilterIcon, SchoolIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CollegeCard } from "~/components/college-card";
import { Search } from "~/components/search";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { calculateAverageRating } from "~/lib/utils";
import { vectorize } from "~/lib/vectorize";
import { SearchColleges } from "~/server/queries";
import { Index } from "@upstash/vector";

interface Colleges {
  id: string;
  name: string;
  image: string;
  location: string;
  reviews: {
    id: string;
    userId: string;
    collegeId: string;
    content: string;
    rating: number;
  }[];
}

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export const dynamic = "force-dynamic";

export default async function DashBoardPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const colleges = await SearchColleges(search);

  if (colleges.length < 3) {
    const vector = await vectorize(search);

    const res = await index.query({
      topK: 5,
      vector,
      includeMetadata: true,
    });

    const vectorColleges = res
      .filter((existingCollege) => {
        if (
          colleges.some((college) => college.id == existingCollege.id) ||
          existingCollege.score < 0.9
        ) {
          return false;
        } else {
          return true;
        }
      })
      .map(({ metadata }) => metadata as unknown as Colleges);

    colleges.push(...vectorColleges);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="bg-background text-white shadow-md">
        <div className="flex flex-col items-center justify-between px-4 py-4 md:flex-row md:px-6 md:py-5">
          <Link className="flex items-center gap-2" href="#">
            <SchoolIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">College Reviews</span>
          </Link>
          <div className="mt-4 flex w-full items-center justify-center gap-4 md:mt-0 md:w-auto">
            <Search search={search} />
            <div className="ml-auto flex items-center gap-4">
              <Link className="hover:underline" href="#">
                My Reviews
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex flex-1 flex-col px-4 py-8 md:px-6 lg:py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="text-lg font-semibold">Explore Colleges</div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                Filter
              </Button>
            </DrawerTrigger>
            <DrawerContent className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white dark:bg-gray-800">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Refine your college search by applying filters.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid flex-1 gap-4 p-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="miami">Miami</SelectItem>
                      <SelectItem value="boston">Boston</SelectItem>
                      <SelectItem value="san-francisco">
                        San Francisco
                      </SelectItem>
                      <SelectItem value="seattle">Seattle</SelectItem>
                      <SelectItem value="austin">Austin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DrawerFooter className="flex items-center justify-between bg-gray-100 px-4 py-4 dark:bg-gray-700">
                <Button>Apply Filters</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex w-full flex-1 items-center justify-center">
          {colleges.length === 0 ? (
            <div className="text-center">Sorry, no results found</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {colleges.map((college) => (
                <Link key={college.id} href={`/college/${college.id}`}>
                  <div>
                    <CollegeCard
                      name={college.name}
                      image={college.image}
                      location={college.location}
                      rating={calculateAverageRating(college.reviews).toFixed(
                        1,
                      )}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
