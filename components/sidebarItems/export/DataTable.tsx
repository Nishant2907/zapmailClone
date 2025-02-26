'use client'
import React, { useState } from 'react';
import { ChevronDown, Copy, Download, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock data with more entries
const mockData = [
    {
        jobId: '10432',
        mailboxCount: '10 Mailboxes',
        exportDate: '12 Sep 2024 00:00 AM',
        platform: 'SmartLead',
        status: 'Completed',
        mailboxes: [
            { email: 'ariana@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana.p@outreachhub.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana@outreachly.info', status: 'Failed', date: '12 Sep 2024, 05:30 AM' },
            { email: 'ariana@useoutreach.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana.p@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'john@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'sarah@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'mike@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'emma@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'david@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' }
        ]
    },
    {
        jobId: '10400',
        mailboxCount: '10 Mailboxes',
        exportDate: '11 Sep 2024 14:36 PM',
        platform: 'Manual',
        status: 'Completed',
        mailboxes: [
            { email: 'ariana@outreachhub.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana.p@openoutreach.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana@openoutreach.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana.p@outreachly.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'ariana@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'peter@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'lisa@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' },
            { email: 'james@outreachlabs.info', status: 'Failed', date: '11 Sep 2024, 05:30 AM' }
        ]
    },
    {
        jobId: '10399',
        mailboxCount: '8 Mailboxes',
        exportDate: '10 Sep 2024 10:30 AM',
        platform: 'SmartLead',
        status: 'Failed',
        mailboxes: Array(8).fill(null).map((_, i) => ({
            email: `user${i + 1}@outreachlabs.info`,
            status: 'Failed',
            date: '10 Sep 2024, 05:30 AM'
        }))
    },
    {
        jobId: '10398',
        mailboxCount: '15 Mailboxes',
        exportDate: '10 Sep 2024 09:15 AM',
        platform: 'Manual',
        status: 'Completed',
        mailboxes: Array(15).fill(null).map((_, i) => ({
            email: `export${i + 1}@outreachlabs.info`,
            status: 'Failed',
            date: '10 Sep 2024, 04:30 AM'
        }))
    },
    {
        jobId: '10397',
        mailboxCount: '12 Mailboxes',
        exportDate: '09 Sep 2024 16:45 PM',
        platform: 'SmartLead',
        status: 'Completed',
        mailboxes: Array(12).fill(null).map((_, i) => ({
            email: `mail${i + 1}@outreachlabs.info`,
            status: 'Failed',
            date: '09 Sep 2024, 03:30 PM'
        }))
    },
    {
        jobId: '10389',
        mailboxCount: '12 Mailboxes',
        exportDate: '09 Sep 2024 16:45 PM',
        platform: 'SmartLead',
        status: 'Completed',
        mailboxes: Array(12).fill(null).map((_, i) => ({
            email: `mail${i + 1}@outreachlabs.info`,
            status: 'Failed',
            date: '09 Sep 2024, 03:30 PM'
        }))
    },
    {
        jobId: '10398',
        mailboxCount: '12 Mailboxes',
        exportDate: '09 Sep 2024 16:45 PM',
        platform: 'SmartLead',
        status: 'Completed',
        mailboxes: Array(12).fill(null).map((_, i) => ({
            email: `mail${i + 1}@outreachlabs.info`,
            status: 'Failed',
            date: '09 Sep 2024, 03:30 PM'
        }))
    },
    {
        jobId: '10399',
        mailboxCount: '12 Mailboxes',
        exportDate: '09 Sep 2024 16:45 PM',
        platform: 'SmartLead',
        status: 'Completed',
        mailboxes: Array(12).fill(null).map((_, i) => ({
            email: `mail${i + 1}@outreachlabs.info`,
            status: 'Failed',
            date: '09 Sep 2024, 03:30 PM'
        }))
    }
];

export default function ExportPage() {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const [platformFilter, setPlatformFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const toggleRow = (jobId: string) => {
        setExpandedRows(prev => ({
            ...prev,
            [jobId]: !prev[jobId]
        }));
    };

    const filteredData = mockData.filter(item => {
        const matchesPlatform = platformFilter === 'All' || item.platform === platformFilter;
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        return matchesPlatform && matchesStatus;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header with filters */}
            <div className="flex items-center justify-between mb-6">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-gray-700">Total No of Exports : </span>
                    <span className="text-blue-600 font-medium">{filteredData.length}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p>Platform:</p>
                        <Select
                            value={platformFilter}
                            onValueChange={(value) => {
                                setPlatformFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Platform" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="SmartLead">SmartLead</SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <p>Status:</p>
                        <Select
                            value={statusFilter}
                            onValueChange={(value) => {
                                setStatusFilter(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden max-h-[35rem]">
                <div className="overflow-auto flex-1">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Job ID</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Mailbox Count</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Export Date</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Platform</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Export Status</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedData.map((item) => (
                                <React.Fragment key={item.jobId}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.jobId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.mailboxCount}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.exportDate}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.platform}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className="flex items-center gap-1 text-gray-700">
                                                <Check className="w-4 h-4 text-green-500" />
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                                                Export CSV
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="text-gray-600 hover:text-gray-900"
                                                onClick={() => toggleRow(item.jobId)}
                                            >
                                                {expandedRows[item.jobId] ? 'Hide' : 'Show'}
                                            </Button>
                                        </td>
                                    </tr>
                                    {expandedRows[item.jobId] && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 bg-gray-50">
                                                <div className="max-h-40 overflow-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr>
                                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                                                    <Checkbox />
                                                                </th>
                                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Mailbox</th>
                                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Export Status</th>
                                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Export Date</th>
                                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {item.mailboxes.slice(0, 5).map((mailbox, index) => (
                                                                <tr key={index} className="hover:bg-gray-100">
                                                                    <td className="px-4 py-2">
                                                                        <Checkbox />
                                                                    </td>
                                                                    <td className="px-4 py-2 text-sm text-gray-900">{mailbox.email}</td>
                                                                    <td className="px-4 py-2">
                                                                        <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                                                            {mailbox.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-2 text-sm text-gray-500">{mailbox.date}</td>
                                                                    <td className="px-4 py-2">
                                                                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                                                                            <Download className="w-4 h-4" />
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            {item.mailboxes.length > 5 && (
                                                                <tr>
                                                                    <td colSpan={5} className="px-4 py-2 text-sm text-gray-500">
                                                                        ... {item.mailboxes.length - 5} more
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Footer */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
                            {' '}-{' '}
                            <span className="font-medium">
                                {Math.min(currentPage * itemsPerPage, filteredData.length)}
                            </span>
                            {' '}of{' '}
                            <span className="font-medium">{filteredData.length}</span> results
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-700">
                                {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>




        </div>
    );
}



// 'use client'
// import React, { useState } from 'react';
// import { ChevronDown, Copy, Download, Check, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";

// const mockData = [
//   {
//     jobId: '10432',
//     mailboxCount: '10 Mailboxes',
//     exportDate: '12 Sep 2024 00:00 AM',
//     platform: 'SmartLead',
//     status: 'Completed',
//     mailboxes: Array(10).fill(null).map((_, i) => ({
//       email: `user${i + 1}@outreachlabs.info`,
//       status: 'Failed',
//       date: '12 Sep 2024, 05:30 AM'
//     }))
//   },
//   {
//     jobId: '10400',
//     mailboxCount: '10 Mailboxes',
//     exportDate: '11 Sep 2024 14:36 PM',
//     platform: 'Manual',
//     status: 'Completed',
//     mailboxes: Array(8).fill(null).map((_, i) => ({
//       email: `user${i + 1}@outreachlabs.info`,
//       status: 'Failed',
//       date: '11 Sep 2024, 05:30 AM'
//     }))
//   }
// ];

// export default function ExportTable() {
//   const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
//   const [platformFilter, setPlatformFilter] = useState('All');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const toggleRow = (jobId: string) => {
//     setExpandedRows(prev => ({ ...prev, [jobId]: !prev[jobId] }));
//   };

//   const filteredData = mockData.filter(item => {
//     const matchesPlatform = platformFilter === 'All' || item.platform === platformFilter;
//     const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
//     return matchesPlatform && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <Card className="p-4">
//             <span className="text-gray-700">Total No of Exports: </span>
//             <span className="text-blue-600 font-medium">{filteredData.length}</span>
//           </Card>
//           <div className="flex gap-4">
//             <Select onValueChange={setPlatformFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Platform" />
//                 <ChevronDown className="ml-2 h-4 w-4" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All</SelectItem>
//                 <SelectItem value="SmartLead">SmartLead</SelectItem>
//                 <SelectItem value="Manual">Manual</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//                 <ChevronDown className="ml-2 h-4 w-4" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All">All</SelectItem>
//                 <SelectItem value="Completed">Completed</SelectItem>
//                 <SelectItem value="Failed">Failed</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <Card>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Job ID</TableHead>
//                 <TableHead>Mailbox Count</TableHead>
//                 <TableHead>Export Date</TableHead>
//                 <TableHead>Platform</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//   {filteredData.map(item => (
//     <React.Fragment key={item.jobId}>
//       <TableRow>
//         <TableCell>{item.jobId}</TableCell>
//         <TableCell>{item.mailboxCount}</TableCell>
//         <TableCell>{item.exportDate}</TableCell>
//         <TableCell>{item.platform}</TableCell>
//         <TableCell>
//           <span className="flex items-center gap-1">
//             <Check className="w-4 h-4 text-green-500" />
//             {item.status}
//           </span>
//         </TableCell>
//         <TableCell className="text-right">
//           <Button variant="ghost" size="sm">Export CSV</Button>
//           <Button variant="ghost" size="sm" onClick={() => toggleRow(item.jobId)}>
//             {expandedRows[item.jobId] ? 'Hide' : 'Show'}
//           </Button>
//         </TableCell>
//       </TableRow>
//       {expandedRows[item.jobId] && (
//         <TableRow>
//           <TableCell colSpan={6}>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Mailbox</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {item.mailboxes.map((mailbox) => (
//                   <TableRow key={mailbox.email}>
//                     <TableCell>{mailbox.email}</TableCell>
//                     <TableCell>{mailbox.status}</TableCell>
//                     <TableCell>{mailbox.date}</TableCell>
//                     <TableCell>
//                       <Button variant="ghost" size="sm">
//                         <Download className="w-4 h-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableCell>
//         </TableRow>
//       )}
//     </React.Fragment>
//   ))}
// </TableBody>

//           </Table>
//         </Card>
//       </div>
//     </div>
//   );
// }
