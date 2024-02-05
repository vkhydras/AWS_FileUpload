"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const goToUpload = () => {
    router.replace("/upload");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={goToUpload}>Go To Upload Form</button>
    </main>
  );
}
