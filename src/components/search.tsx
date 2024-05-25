"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export function Search({ search }: { search?: string }) {
  const router = useRouter();
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      router.push(`/dashboard?search=${query}`);
    } else {
      router.push("/dashboard");
    }
  }, [query, router]);

  useEffect(() => {
    if (text === query) {
      setIsLoading(false);
    }
  }, [query, text]);

  return (
    <div className="relative w-full max-w-md md:w-auto">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 md:w-auto"
        placeholder="Search colleges..."
        type="search"
      />
      {isLoading && <div className="loader">Loading...</div>}
    </div>
  );
}
