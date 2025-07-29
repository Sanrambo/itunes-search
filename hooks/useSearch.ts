"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/results?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
  };
}
