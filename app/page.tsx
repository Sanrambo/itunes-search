"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";

export default function Home() {
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();

  return (
    <div className="relative min-h-screen w-full">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:80px_80px]",
          "[background-image:linear-gradient(to_right,rgb(38_38_38_/_0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38_38_38_/_0.2)_1px,transparent_1px)]"
        )}
      />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="mb-10">
          <Image
            src="/applelibrary2.png"
            alt="Apple"
            width={600}
            height={300}
          />
        </div>
        <div className="flex w-full max-w-5xl gap-2">
          <form onSubmit={handleSearch} className="flex w-full gap-2 pb-10">
            <Input
              type="text"
              className="w-[50vw] h-20 text-xl placeholder:text-xl"
              placeholder="Search through AppleLibrary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="w-60 h-20 text-xl" variant="noShadow">
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
