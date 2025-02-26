import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Globe, Wallet } from "lucide-react";
import ServiceToggle from "@/components/layout/ServiceToggle";
import MailboxDashboard from "@/components/sidebarItems/mailboxes/mailbox"
export default function MailboxPage() {
  return (
    <>
      <div className="flex md:flex-row space-y-4 md:space-y-0 flex-col items-start md:items-center justify-between w-full pb-4 border-b border-gray-200">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold">Mailboxes</h1>
          <p className="text-sm">Here you can see all your active mailboxes, their current usage, and add or manage mailboxes for your Zapmail account.</p>
        </div>
        <ServiceToggle />
      </div>

      <div className="py-6 space-y-6">
        {/* <p>meow</p> */}
        <MailboxDashboard />
      </div>
    </>
  );
}