import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Globe, Wallet } from "lucide-react";
import ServiceToggle from "@/components/layout/ServiceToggle";

export default function SubscriptionPage() {
  return (
    <>
      <div className="flex md:flex-row space-y-4 md:space-y-0 flex-col items-start md:items-center justify-between w-full pb-4 border-b border-gray-200">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-sm">View your current subscriptions, their renewal dates, and usage.</p>
        </div>
        <ServiceToggle />
      </div>

      <div className="py-6 space-y-6">
        <p>meow</p>
      </div>
    </>
  );
}