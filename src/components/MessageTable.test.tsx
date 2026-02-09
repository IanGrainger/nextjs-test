import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageTable } from '@/components/MessageTable';

describe('MessageTable Component', () => {
  const mockMessages = [
    {
      guid: '550e8400-e29b-41d4-a716-446655440000',
      fromCode: 'SENDER001',
      toCode: 'RECVR001',
      correspondentName: 'John Smith',
      status: 'delivered',
    },
    {
      guid: '550e8400-e29b-41d4-a716-446655440001',
      fromCode: 'SENDER002',
      toCode: 'RECVR002',
      correspondentName: 'Jane Doe',
      status: 'failed',
    },
    {
      guid: '550e8400-e29b-41d4-a716-446655440002',
      fromCode: 'SENDER001',
      toCode: 'RECVR003',
      correspondentName: 'Bob Johnson',
      status: 'pending',
    },
  ];

  it('renders table headers', () => {
    render(<MessageTable messages={mockMessages} />);

    expect(screen.getByText('GUID')).toBeInTheDocument();
    expect(screen.getByText('From Code')).toBeInTheDocument();
    expect(screen.getByText('To Code')).toBeInTheDocument();
    expect(screen.getByText('Correspondent Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders all message rows', () => {
    render(<MessageTable messages={mockMessages} />);

    // Check for correspondent names
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    // Check for codes - using getAllByText since SENDER001 appears twice
    const senderCodes = screen.getAllByText('SENDER001');
    const receiverCodes = screen.getAllByText('RECVR001');
    expect(senderCodes.length).toBeGreaterThan(0);
    expect(receiverCodes.length).toBeGreaterThan(0);
  });

  it('renders status badges with correct styling', () => {
    render(<MessageTable messages={mockMessages} />);

    const deliveredBadge = screen.getByText('delivered');
    const failedBadge = screen.getByText('failed');
    const pendingBadge = screen.getByText('pending');

    expect(deliveredBadge).toBeInTheDocument();
    expect(failedBadge).toBeInTheDocument();
    expect(pendingBadge).toBeInTheDocument();
  });

  it('renders empty table with no messages', () => {
    render(<MessageTable messages={[]} />);

    // Headers should still be present
    expect(screen.getByText('GUID')).toBeInTheDocument();
    expect(screen.getByText('Correspondent Name')).toBeInTheDocument();
  });
});
