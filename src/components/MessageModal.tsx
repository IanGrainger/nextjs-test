'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Message {
  guid: string;
  fromCode: string;
  toCode: string;
  correspondentName: string;
  status: string;
}

interface MessageModalProps {
  message: Message;
}

export function MessageModal({ message }: MessageModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => router.back()}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-lg dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-200 px-6 py-4 dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Message Details
          </h2>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              GUID
            </label>
            <p className="mt-1 break-all font-mono text-sm text-slate-700 dark:text-slate-300">
              {message.guid}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                From Code
              </label>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {message.fromCode}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                To Code
              </label>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {message.toCode}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Correspondent Name
            </label>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
              {message.correspondentName}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Status
            </label>
            <p
              className={`mt-1 inline-block rounded-full border px-3 py-1 text-sm font-semibold ${getStatusColor(message.status)}`}
            >
              {message.status}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-3 dark:border-zinc-700">
          <button
            onClick={() => router.back()}
            className="w-full rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-zinc-800 dark:text-slate-300 dark:hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
