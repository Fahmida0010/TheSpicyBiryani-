import { Suspense } from "react";
import SuccessContent from "./success-content";


export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}