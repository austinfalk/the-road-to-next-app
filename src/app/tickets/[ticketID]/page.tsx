import { initialTickets } from "@/data";

type TicketPageProps = {
  params: Promise<{
    ticketID: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketID } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketID);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
};

export default TicketPage;
