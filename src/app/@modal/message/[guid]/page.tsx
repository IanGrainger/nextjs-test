import { MessageModal } from '@/components/MessageModal';

interface Message {
  guid: string;
  fromCode: string;
  toCode: string;
  correspondentName: string;
  status: string;
}

async function getMessage(guid: string): Promise<Message | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/data/messages.json`,
      {
        next: { revalidate: 60 },
      },
    );
    if (!response.ok) return null;
    const messages: Message[] = await response.json();
    return messages.find((m) => m.guid === guid) || null;
  } catch {
    return null;
  }
}

export default async function MessageModalPage({
  params,
}: {
  params: Promise<{ guid: string }>;
}) {
  const { guid } = await params;
  const message = await getMessage(guid);

  if (!message) {
    return null;
  }

  return <MessageModal message={message} />;
}
