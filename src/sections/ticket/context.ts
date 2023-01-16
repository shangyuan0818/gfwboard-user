import { useEffect, useMemo, useState } from "react";
import { useSet, useToggle } from "ahooks";

// project imports
import { useGetTicketQuery, useGetTicketsQuery, useReplyTicketMutation } from "@/store/services/api";
import constate from "constate";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export interface useTicketProps {
  id?: number;
}

const useTicket = ({ id }: useTicketProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [drawerOpen, drawerActions] = useToggle(!isMobile);
  const [currentId, setCurrentId] = useState<number>(id ?? 0);
  const [search, setSearch] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const drawerWidth = useMemo(() => (isMobile ? 280 : 320), [isMobile]);

  const ticketsQuery = useGetTicketsQuery(undefined, {
    pollingInterval: 1000 * 60
  });
  const ticketQuery = useGetTicketQuery(currentId, {
    skip: currentId === 0,
    pollingInterval: 1000 * 30
  });
  const [replyTicketMessage] = useReplyTicketMutation();

  useEffect(() => {
    if (currentId) {
      setMessageInput("");
      setErrorMessage(null);
    }
  }, [currentId]);

  useEffect(() => {
    if (ticketsQuery.data && (ticketsQuery.data?.length ?? 0) > 0 && !currentId) {
      setCurrentId(ticketsQuery.data[0].id);
    }
  });

  const handleOnSend = async () => {
    if (messageInput.trim() === "") {
      enqueueSnackbar(
        t("notice::send-message", {
          context: "empty"
        }),
        {
          variant: "warning"
        }
      );
      return;
    }

    try {
      await replyTicketMessage({
        id: currentId,
        message: messageInput
      }).unwrap();
      enqueueSnackbar(t("notice::send-message", { context: "success" }), { variant: "success" });
      setMessageInput("");
      setErrorMessage(null);
    } catch (error: any) {
      console.error("error sending message", error);
      enqueueSnackbar(t("notice::send-message", { context: "failed" }), { variant: "error" });
      setErrorMessage(error.message);
    }
  };

  return {
    ticketsQuery,
    ticketQuery,
    currentId,
    setCurrentId,
    drawerOpen,
    drawerActions,
    drawerWidth,
    search,
    setSearch,
    messageInput,
    setMessageInput,
    handleOnSend,
    errorMessage
  };
};

const [TicketProvider, useTicketContext] = constate(useTicket);

export { TicketProvider, useTicketContext };
