import { useMemo, useState } from "react";
import { useSet, useToggle } from "ahooks";

// project imports
import { useGetTicketsQuery } from "@/store/services/api";
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

  const drawerWidth = useMemo(() => (isMobile ? 280 : 320), [isMobile]);

  const ticketsQuery = useGetTicketsQuery(undefined, {
    pollingInterval: 1000
  });

  return {
    ticketsQuery,
    historySet,
    historyActions,
    currentId,
    setCurrentId,
    drawerOpen,
    drawerActions,
    drawerWidth,
    search,
    setSearch
  };
};

const [TicketProvider, useTicketContext] = constate(useTicket);

export { TicketProvider, useTicketContext };
