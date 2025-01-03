import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import BestRated from "@/components/BestRated";

function Loading() {
  return <div>Loading...</div>;
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<Loading />}>
        <BestRated />
      </Suspense>
    </div>
  );
}
