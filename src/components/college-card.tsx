import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { BookIcon, LocateIcon, StarIcon } from "lucide-react";

export function CollegeCard() {
  return (
    <Card className="h-full rounded-lg bg-background shadow-md transition-shadow duration-300 hover:shadow-lg dark:shadow-lg">
      <Image
        alt="College Image"
        className="h-40 w-full rounded-t-lg object-cover"
        height={250}
        src="/placeholder.svg"
        style={{
          aspectRatio: "400/250",
          objectFit: "cover",
        }}
        width={400}
      />
      <CardContent className="flex-1 space-y-2 p-4">
        <h3 className="text-lg font-semibold">MVP&apos;s KBTCOE College</h3>
        <div className="flex items-center gap-2">
          <LocateIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Nashik, Maharashtra
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BookIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Mechanical Engineering, Electrical Engineering, Computer Science
            Engineering
          </span>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="h-4 w-4 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            4.9
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
