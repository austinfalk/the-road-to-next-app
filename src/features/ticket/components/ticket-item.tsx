import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TICKET_ICONS } from '@/features/ticket/constants';
import { Ticket } from '@/features/ticket/types';
import { ticketPath } from '@/paths';

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card className="w-full max-w-[420px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <h3 className="truncate text-2xl font-bold">{ticket.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 whitespace-break-spaces">{ticket.content}</p>
      </CardContent>
      <CardFooter>
        <Link href={ticketPath(ticket.id)} className="text-sm underline">
          View
        </Link>
      </CardFooter>
    </Card>
  );
};

export { TicketItem };
