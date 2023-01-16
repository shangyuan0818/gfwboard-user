import { useEffect, useMemo, useState } from "react";
import { useSet, useToggle } from "ahooks";

// project imports
import { useGetTicketQuery, useGetTicketsQuery } from "@/store/services/api";
import constate from "constate";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface useTicketProps {
  id?: number;
}

const useTicket = ({ id }: useTicketProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, drawerActions] = useToggle(!isMobile);
  const [historySet, historyActions] = useSet<number>(id ? [id] : []);
  const [currentId, setCurrentId] = useState<number>(id ?? 0);
  const [search, setSearch] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");

  const drawerWidth = useMemo(() => (isMobile ? 280 : 320), [isMobile]);

  const ticketsQuery = useGetTicketsQuery(undefined, {
    pollingInterval: 1000 * 60
  });
  const ticketQuery = useGetTicketQuery(currentId, {
    skip: currentId === 0,
    pollingInterval: 1000 * 30
  });

  return {
    ticketsQuery,
    ticketQuery,
    historySet,
    historyActions,
    currentId,
    setCurrentId,
    drawerOpen,
    drawerActions,
    drawerWidth,
    search,
    setSearch,
    messageInput,
    setMessageInput
  };
};

const [TicketProvider, useTicketContext] = constate(useTicket);

export { TicketProvider, useTicketContext };
