import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Globe, Wallet } from "lucide-react";
import ServiceToggle from "@/components/layout/ServiceToggle";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between w-full pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ServiceToggle />
      </div>

      <div className="py-6 space-y-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Welcome, User 👋</h1>
        </div>
        <p className="text-muted-foreground">
          Manage mailboxes, domains, and wallet here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mailboxes Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Mailboxes</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Quickly set up and manage your mailboxes for outreach.
            </p>
            <p className="mb-4">Total Mailboxes: 0</p>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Manage Mailboxes
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Buy Mailboxes
              </Button>
            </div>
          </Card>

          {/* Domains Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Domains</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Your domains organized and easy to manage.
            </p>
            <p className="mb-4">Total Domains: 5</p>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Manage Domains
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Buy Domains
              </Button>
            </div>
          </Card>

          {/* Wallet Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Wallet</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Keep your balance topped up for easy payments.
            </p>
            <p className="mb-4">Wallet Balance: $0</p>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Manage Wallet
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Add More Balance
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}