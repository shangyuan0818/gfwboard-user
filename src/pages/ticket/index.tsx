import React from "react";

// project imports
import useTitle from "@/hooks/useTitle";
import { TicketProvider } from "@/sections/ticket/detailPage/context";
import TicketSection from "@/sections/ticket/detailPage";

// assets
import "emoji-picker-react/src/EmojiPickerReact.css";

const Ticket: React.FC = () => {
  useTitle("ticket");

  return (
    <TicketProvider>
      <TicketSection />
    </TicketProvider>
  );
};

export default Ticket;
