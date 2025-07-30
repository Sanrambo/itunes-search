"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ContentLoader from "./ContentLoader";
import { useMinimumLoadingTime } from "@/hooks/useMinimumLoadingTime";
import { Badge } from "@/components/ui/badge";
import ResultModal from "./ResultModal";
import NoResult from "@/app/components/NoResult";
import { motion, AnimatePresence } from "framer-motion";

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
  ResetType: (type: string) => void;
}

const MediaResult = ({ term, type, ResetType }: ResultProps) => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMedia, setSelectedMedia] = useState<ResultItem | null>(null);

  useEffect(() => {
    if (term) {
      setLoading(true);
      setResults([]);
      axios
        .post("api/search", { term })
        .then(() => axios.get(`api/results?term=${encodeURIComponent(term)}`))
        .then((response) => {
          setResults(response.data?.data || []);
        })
        .catch((error) => {
          console.error("Error:", error);
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
          ResetType("");
        });
    }
  }, [term]);

  const showLoading = useMinimumLoadingTime(loading, 500);

  const filteredResults =
    type === "" ? results : results.filter((r) => r.media_type === type);

  return (
    <div className="w-full">
      {showLoading ? (
        <ContentLoader />
      ) : filteredResults.length === 0 ? (
        <NoResult />
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredResults.map((result) => (
              <motion.div
                key={result.media_id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="w-full max-w-lg mx-auto cursor-pointer"
                  onClick={() => setSelectedMedia(result)}
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

                {selectedMedia?.media_id === result.media_id && (
                  <ResultModal
                    isOpen={selectedMedia !== null}
                    onClose={() => setSelectedMedia(null)}
                    media={selectedMedia}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default MediaResult;
