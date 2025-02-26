'use client'
import React, { useState } from 'react';
import { Search, Plus, Trash2, Download, Edit, RefreshCw, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockMailboxes = [
  {
    domain: 'useoutreach.info',
    email: 'ariana@useoutreach.info',
    name: 'Ariana Patel',
    status: 'Expired',
    isAdmin: true,
    recoveryEmail: '1000000624@rc.zapmail.ai',
    createdDate: '10 Sep 2024, 05:59 PM',
    tag: 'dsadsa'
  },
  {
    domain: 'outreachly.info',
    email: 'ariana@outreachly.info',
    name: 'Ariana Smith',
    status: 'Active',
    isAdmin: false,
    recoveryEmail: '1000000625@rc.zapmail.ai',
    createdDate: '10 Sep 2024, 06:00 PM',
    tag: 'dsadsa'
  }
];

function Mailboxes() {
  const [selectedMailboxes, setSelectedMailboxes] = useState<string[]>([]);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    'useoutreach.info': true
  });

  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => ({
      ...prev,
      [domain]: !prev[domain]
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Mailboxes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here you can see all your active mailboxes, their current usage, and add or manage mailboxes for your Zapmail account.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">-9 of 0</div>
              <div className="text-sm text-gray-500">Available Mailboxes</div>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full">
            <Plus className="w-4 h-4 mr-2" />
            Assign Mailboxes
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">0</div>
              <div className="text-sm text-gray-500">Active Mailboxes</div>
            </div>
          </div>
          <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Buy New Mailboxes
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <Select defaultValue="none">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Tags: None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="dsadsa">dsadsa</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Buy New Mailboxes
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Select Mailboxes to Edit or Export
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" disabled={selectedMailboxes.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" disabled={selectedMailboxes.length === 0}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button variant="outline" disabled={selectedMailboxes.length === 0}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <div className="text-sm text-gray-700">
                Mailboxes Selected : <span className="font-medium">{selectedMailboxes.length}</span>
              </div>
              <Checkbox
                checked={selectedMailboxes.length === mockMailboxes.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedMailboxes(mockMailboxes.map(m => m.email));
                  } else {
                    setSelectedMailboxes([]);
                  }
                }}
              />
            </div>
          </div>

          {mockMailboxes.map((mailbox) => (
            <div key={mailbox.email} className="border-t border-gray-200 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{mailbox.domain}</span>
                  <Button variant="outline" size="sm">
                    <Plus className="w-3 h-3 mr-1" />
                    Add tag
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleDomain(mailbox.domain)}
                >
                  {expandedDomains[mailbox.domain] ? 'Hide' : 'Show'} Details
                </Button>
              </div>

              {expandedDomains[mailbox.domain] && (
                <div className="mt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-2">
                          <Checkbox
                            checked={selectedMailboxes.includes(mailbox.email)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMailboxes(prev => [...prev, mailbox.email]);
                              } else {
                                setSelectedMailboxes(prev => prev.filter(email => email !== mailbox.email));
                              }
                            }}
                          />
                        </th>
                        <th className="pb-2">Mailbox</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Recovery Email</th>
                        <th className="pb-2">Created Date</th>
                        <th className="pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-sm">
                        <td className="py-2">
                          <Checkbox
                            checked={selectedMailboxes.includes(mailbox.email)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMailboxes(prev => [...prev, mailbox.email]);
                              } else {
                                setSelectedMailboxes(prev => prev.filter(email => email !== mailbox.email));
                              }
                            }}
                          />
                        </td>
                        <td className="py-2">
                          <div>
                            {mailbox.email}
                            {mailbox.isAdmin && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{mailbox.name}</div>
                        </td>
                        <td className="py-2">
                          <span className={`px-2 py-1 text-sm rounded-full ${
                            mailbox.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {mailbox.status}
                          </span>
                        </td>
                        <td className="py-2"></td>
                        <td className="py-2">
                          <span className="px-2 py-1 text-sm bg-purple-100 rounded-lg">
                            {mailbox.recoveryEmail}
                          </span>
                        </td>
                        <td className="py-2">{mailbox.createdDate}</td>
                        <td className="py-2">
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mailboxes;