import { Suspense } from "react";
import ResultPageContent from "./components/ResultPageContent";
import ContentLoader from "./components/ContentLoader";

export default function ResultPage() {
  return (
    <Suspense fallback={<ContentLoader />}>
      <ResultPageContent />
    </Suspense>
  );
}
