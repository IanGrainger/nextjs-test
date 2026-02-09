'use client';

import { useEffect, useState } from 'react';
import { MessageTable } from '@/components/MessageTable';

interface Message {
  guid: string;
  fromCode: string;
  toCode: string;
  correspondentName: string;
  status: string;
}

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/data/messages.json');
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 flex-col gap-8 py-12 px-6 md:px-12">
        <div>
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            Messages
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            View all messages and their delivery status
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">
              Loading messages...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-100">
            <p>Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && messages.length > 0 && (
          <div className="rounded-lg bg-white p-6 shadow dark:bg-zinc-900">
            <MessageTable messages={messages} />
          </div>
        )}

        {!isLoading && !error && messages.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">
              No messages found
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

