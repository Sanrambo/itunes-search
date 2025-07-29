"use client";
import React, { useState } from "react";
import ResultsContent from "./components/resultsContent";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar";
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

export default function ResultPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();

  const [type, setType] = useState<string>("");

  return (
    <SidebarProvider>
      <AppSidebar />
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
            <div className="flex items-center px-5 gap-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="noShadow">Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Checkbox
                        checked={type === "song"}
                        onCheckedChange={(checked) =>
                          setType(checked ? "song" : "")
                        }
                      />
                      <label>Song</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox
                        checked={type === "podcast"}
                        onCheckedChange={(checked) =>
                          setType(checked ? "podcast" : "")
                        }
                      />
                      <label>Podcast</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox
                        checked={type === "feature-movie"}
                        onCheckedChange={(checked) =>
                          setType(checked ? "feature-movie" : "")
                        }
                      />
                      <label>Movie</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox
                        checked={type === "audiobook"}
                        onCheckedChange={(checked) =>
                          setType(checked ? "audiobook" : "")
                        }
                      />
                      <label>Audiobook</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox
                        checked={type === "music-videos"}
                        onCheckedChange={(checked) =>
                          setType(checked ? "music-videos" : "")
                        }
                      />
                      <label>Music Videos</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox
                        checked={type === "tv-episode"}
                        onCheckedChange={(checked) =>
                          setType(checked ? "tv-episode" : "")
                        }
                      />
                      <label>TV Episode</label>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </form>
          <ResultsContent term={term || ""} type={type || ""} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
