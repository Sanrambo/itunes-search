"use client";
import React, { useState, Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "./AppSidebar";
import MediaResult from "./MediaResult";

function ResultPageContent() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();
  const [type, setType] = useState<string>("");

  return (
    <SidebarProvider>
    <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        <div className="flex-1 p-5 pt-0">
          <form onSubmit={handleSearch} className="flex w-full gap-2 pb-10">
            <Input
              type="text"
              className="w-[50vw] text-md placeholder:text-md"
              placeholder="Search through AppleLibrary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="w-60 text-md" variant="noShadow">
              Search
            </Button>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="noShadow">Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onSelect={() => setType(type === "song" ? "" : "song")}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={type === "song"} />
                      <span>Song</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setType(type === "podcast" ? "" : "podcast")}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={type === "podcast"} />
                      <span>Podcast</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setType(type === "feature-movie" ? "" : "feature-movie")}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={type === "feature-movie"} />
                      <span>Movie</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setType(type === "audiobook" ? "" : "audiobook")}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={type === "audiobook"} />
                      <span>Audiobook</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setType(type === "music-videos" ? "" : "music-videos")}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={type === "music-videos"} />
                      <span>Music Videos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setType(type === "tv-episode" ? "" : "tv-episode")}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={type === "tv-episode"} />
                      <span>TV Episode</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </form>
          <MediaResult term={term || ""} type={type || ""} ResetType={setType} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ResultPageContent;

