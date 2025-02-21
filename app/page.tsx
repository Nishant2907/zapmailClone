import Image from "next/image";
import type { Metadata } from 'next'
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Zapmail clone",
  description: "Zapmail clone",
};

export default function Home() {
  return (
    <main className='flex-1 flex justify-center grow'>
      <div className='grow flex items-center justify-center'>
        <Layout />
      </div>
    </main>
  );
}
