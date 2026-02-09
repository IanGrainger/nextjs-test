import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageModal } from '@/components/MessageModal';

// Mock next/navigation
const mockBack = vi.fn();
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
}));

describe('MessageModal Component', () => {
  const mockMessage = {
    guid: '550e8400-e29b-41d4-a716-446655440000',
    fromCode: 'SENDER001',
    toCode: 'RECVR001',
    correspondentName: 'John Smith',
    status: 'delivered',
  };

  beforeEach(() => {
    mockBack.mockClear();
    mockPush.mockClear();
  });

  it('renders message details', () => {
    render(<MessageModal message={mockMessage} />);

    expect(screen.getByText('Message Details')).toBeInTheDocument();
    expect(screen.getByText(mockMessage.guid)).toBeInTheDocument();
    expect(screen.getByText('SENDER001')).toBeInTheDocument();
    expect(screen.getByText('RECVR001')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('displays status badge', () => {
    render(<MessageModal message={mockMessage} />);

    expect(screen.getByText('delivered')).toBeInTheDocument();
  });

  it('has a close button', () => {
    render(<MessageModal message={mockMessage} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls router.back() when closing an intercepted modal', async () => {
    const user = userEvent.setup();
    render(<MessageModal message={mockMessage} isIntercepted={true} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(mockBack).toHaveBeenCalled();
  });

  it('calls router.push("/") when closing a direct modal', async () => {
    const user = userEvent.setup();
    render(<MessageModal message={mockMessage} isIntercepted={false} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders modal with correct labels', () => {
    render(<MessageModal message={mockMessage} />);

    expect(screen.getByText('GUID')).toBeInTheDocument();
    expect(screen.getByText('From Code')).toBeInTheDocument();
    expect(screen.getByText('To Code')).toBeInTheDocument();
    expect(screen.getByText('Correspondent Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});
