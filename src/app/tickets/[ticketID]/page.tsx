type TicketPageProps = {
  params: Promise<{
    ticketID: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketID } = await params;
  // Here you can fetch ticket details using ticketID if needed
  // For now, we will just display the ticketID
  return <h2 className="text-lg">Welcome to Ticket Page {ticketID}!</h2>;
};

export default TicketPage;
