import { LucideSquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TICKET_ICONS } from '@/features/ticket/constants';
import { Ticket } from '@/features/ticket/types';
import { ticketPath } from '@/paths';

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)} className="text-sm">
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div className="flex w-full max-w-[420px] gap-x-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <h3 className="truncate text-2xl font-bold">{ticket.title}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 whitespace-break-spaces">
            {ticket.content}
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-x-1">{detailButton}</div>
    </div>
  );
};

export { TicketItem };
