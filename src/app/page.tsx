"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button ><Link href='/upload'>Upload Form</Link></button>
    
    </main>
  );
}
