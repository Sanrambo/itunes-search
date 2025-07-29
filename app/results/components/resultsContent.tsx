"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "./loader";
import { useMinimumLoadingTime } from "@/hooks/useMinimumLoadingTime";
import { Badge } from "@/components/ui/badge";
import MediaModal from "./mediaModal";

type ResultItem = {
  media_id: number;
  media_name: string;
  media_type: string;
  artist_name: string;
  artwork_url: string;
  preview_url?: string;
};

interface ResultProps {
  term: string;
  type: string;
}

const resultsContent = ({ term, type }: ResultProps) => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ResultItem | null>(null);

  useEffect(() => {
    if (term) {
      axios
        .post("api/search", { term })
        .then(() => {
          return axios.get(`api/results?term=${encodeURIComponent(term)}`);
        })
        .then((response) => {
          setResults(response.data?.data || []);
        })
        .catch((error) => {
          console.error("Error:", error);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }
  }, [term]);

  const showLoading = useMinimumLoadingTime(loading, 500);

  return (
    <div className="w-full">
      {showLoading ? (
        <Loader />
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <Image src="/empty.png" alt="empty" width={300} height={300} />
          <p className="text-2xl font-semibold mb-2">No results found</p>
          <p className="text-muted-foreground">
            Try searching for something else
          </p>
        </div>
      ) : type === "" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => (
            <div key={result.media_id}>
              <Card
                className="w-full max-w-lg mx-auto cursor-pointer"
                onClick={() => setSelectedItem(result)}
              >
                <CardHeader className="pb-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={result.artwork_url}
                      alt={result.media_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-2xl truncate text-main">
                    {result.media_name}
                  </p>
                  <p className="text-muted-foreground text-lg truncate font-medium">
                    {result.artist_name}
                  </p>
                  <Badge className="text-sm text-muted-foreground capitalize mt-1">
                    {result.media_type}
                  </Badge>
                </CardContent>
              </Card>

              {selectedItem?.media_id === result.media_id && (
                <MediaModal
                  isOpen={selectedItem !== null}
                  onClose={() => setSelectedItem(null)}
                  item={selectedItem}
                />
              )}
            </div>
          ))}
        </div>
      ) : type !== "" ? (
        results.filter((result) => result.media_type === type).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <Image src="/empty.png" alt="empty" width={300} height={300} />
            <p className="text-2xl font-semibold mb-2">
              No results found for {type}
            </p>
            <p className="text-muted-foreground">
              Try searching for something else or choose a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results
              .filter((result) => result.media_type === type)
              .map((result) => (
                <div key={result.media_id}>
                  <Card
                    className="w-full max-w-lg mx-auto cursor-pointer"
                    onClick={() => setSelectedItem(result)}
                  >
                    <CardHeader className="pb-4">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={result.artwork_url}
                          alt={result.media_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-2xl truncate text-main">
                        {result.media_name}
                      </p>
                      <p className="text-muted-foreground text-lg truncate font-medium">
                        {result.artist_name}
                      </p>
                      <Badge className="text-sm text-muted-foreground capitalize mt-1">
                        {result.media_type}
                      </Badge>
                    </CardContent>
                  </Card>
                  {selectedItem?.media_id === result.media_id && (
                    <MediaModal
                      isOpen={selectedItem !== null}
                      onClose={() => setSelectedItem(null)}
                      item={selectedItem}
                    />
                  )}
                </div>
              ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export default resultsContent;
