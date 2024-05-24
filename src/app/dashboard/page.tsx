import { UserButton } from "@clerk/nextjs";
import { FilterIcon, SchoolIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CollegeCard } from "~/components/college-card";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function DashBoardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="bg-background text-white shadow-md">
        <div className="flex flex-col items-center justify-between px-4 py-4 md:flex-row md:px-6 md:py-5">
          <Link className="flex items-center gap-2" href="#">
            <SchoolIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">College Reviews</span>
          </Link>
          <div className="mt-4 flex w-full items-center justify-center gap-4 md:mt-0 md:w-auto">
            <form className="relative w-full max-w-md md:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <Input
                className="w-full rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 md:w-auto"
                placeholder="Search colleges..."
                type="search"
              />
            </form>
            <div className="ml-auto flex items-center gap-4">
              <Link className="hover:underline" href="#">
                My Reviews
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
          <CollegeCard />
        </div>
      </main>
    </div>
  );
}
