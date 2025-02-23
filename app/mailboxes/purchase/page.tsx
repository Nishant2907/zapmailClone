import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from 'next/link'
import ServiceToggle from "@/components/layout/ServiceToggle";

export default function PurchasePage() {
  return (
    <>
      <div className="flex md:flex-row space-y-4 md:space-y-0 flex-col items-start md:items-center justify-between w-full pb-4 border-b border-gray-200">

        <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 md:space-y-0">
          <Link href="/mailboxes" className="p-0 m-0 underline">
            <Button className=" h-8" variant="outline">
              <ChevronLeft className="h-6 w-6 text-black" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-medium">Buy More Mailboxes</h1>
        </div>
        <ServiceToggle />
      </div>

      <div className="py-6 space-y-6">
        <p>meow</p>
      </div>
    </>
  );
}