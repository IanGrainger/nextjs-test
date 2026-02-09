'use client';

import { useRouter } from 'next/navigation';

interface Message {
  guid: string;
  fromCode: string;
  toCode: string;
  correspondentName: string;
  status: string;
}

interface MessageTableProps {
  messages: Message[];
}

export function MessageTable({ messages }: MessageTableProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
      case 'failed':
        return 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-slate-200 dark:border-zinc-700">
        <thead className="bg-slate-50 dark:bg-zinc-800">
          <tr>
            <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-zinc-700 dark:text-slate-300">
              GUID
            </th>
            <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-zinc-700 dark:text-slate-300">
              From Code
            </th>
            <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-zinc-700 dark:text-slate-300">
              To Code
            </th>
            <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-zinc-700 dark:text-slate-300">
              Correspondent Name
            </th>
            <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-zinc-700 dark:text-slate-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr
              key={message.guid}
              onClick={() => router.push(`/message/${message.guid}`)}
              className="border-b border-slate-200 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
            >
              <td className="border border-slate-200 px-4 py-3 text-sm font-mono text-slate-700 dark:border-zinc-700 dark:text-slate-300">
                {message.guid}
              </td>
              <td className="border border-slate-200 px-4 py-3 text-sm text-slate-700 dark:border-zinc-700 dark:text-slate-300">
                {message.fromCode}
              </td>
              <td className="border border-slate-200 px-4 py-3 text-sm text-slate-700 dark:border-zinc-700 dark:text-slate-300">
                {message.toCode}
              </td>
              <td className="border border-slate-200 px-4 py-3 text-sm text-slate-700 dark:border-zinc-700 dark:text-slate-300">
                {message.correspondentName}
              </td>
              <td className="border border-slate-200 px-4 py-3 text-sm dark:border-zinc-700">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}
                >
                  {message.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
