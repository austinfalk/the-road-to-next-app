'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/components/heading';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTickets } from '@/features/ticket/queries/get-tickets';
import type { Ticket } from '@/features/ticket/types';

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();
      setTickets(result);
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="TicketsPage"
        description="All your tickets in one place"
      />

      <div className="animate-fade-from-top flex flex-1 flex-col items-center gap-y-4">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
