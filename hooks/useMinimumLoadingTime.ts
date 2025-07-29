"use client";

import { useState, useEffect } from "react";

export function useMinimumLoadingTime(isLoading: boolean, minimumLoadingTimeMs: number = 1000) {
  const [showLoading, setShowLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, minimumLoadingTimeMs);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minimumLoadingTimeMs]);

  return showLoading;
}
