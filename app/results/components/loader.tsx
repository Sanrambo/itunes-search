import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Image
        src="/apple.png"
        alt="Loading"
        width={300}
        height={300}
        className="animate-pulse"
      />
    </div>
  );
}
