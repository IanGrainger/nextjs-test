import { describe, it, expect, beforeEach, vi, afterEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page heading', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Messages')).toBeInTheDocument();
    });
  });

  it('renders the message table with data', async () => {
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
    ];

    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMessages,
    });

    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByText('John Smith')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Check that table headers are rendered
    expect(screen.getByText('GUID')).toBeInTheDocument();
    expect(screen.getByText('From Code')).toBeInTheDocument();
    expect(screen.getByText('To Code')).toBeInTheDocument();
    expect(screen.getByText('Correspondent Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check that data is rendered
    expect(screen.getByText('SENDER001')).toBeInTheDocument();
    expect(screen.getByText('delivered')).toBeInTheDocument();
    expect(screen.getByText('failed')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('displays empty state when no messages', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByText('No messages found')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
