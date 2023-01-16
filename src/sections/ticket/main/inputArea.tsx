import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import lo from "lodash-es";

// material-ui
import { IconButton, Stack, TextField } from "@mui/material";

// project imports
import EmojiChoose from "@/sections/ticket/main/emojiChoose";
import { useTicketContext } from "@/sections/ticket/context";
import { useGetTicketQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";

// assets
import { SendOutlined } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`
  },
  textField: {
    paddingRight: theme.spacing(2),
    "& .MuiInput-root:before": { borderBottomColor: theme.palette.divider }
  }
}));

const InputArea: React.FC = () => {
  const { t } = useTranslation();
  const { currentId, messageInput, setMessageInput } = useTicketContext();

  const { data } = useGetTicketQuery(currentId, {
    skip: currentId === 0
  });

  const { classes } = useStyles();

  // handle new message form
  const textInput = useRef<HTMLInputElement>(null);

  const handleOnSend = () => {
    if (messageInput.trim() === "") {
      // do nothing
    } else {
      // send message
    }
    setMessageInput("");
  };

  const handleEnter = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        if (event.ctrlKey) {
          setMessageInput(messageInput + "\n");
        } else {
          handleOnSend();
        }
    }
  };

  useEffect(() => {
    if (textInput.current) {
      textInput.current.addEventListener("keypress", handleEnter);
    }
  }, [textInput.current]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      value = lo.trim(value);
      setMessageInput(value);
    },
    [setMessageInput]
  );

  return (
    <Stack className={classes.root}>
      <TextField
        inputRef={textInput}
        className={classes.textField}
        rows={4}
        placeholder={t("ticket.input-area.input", { context: "placeholder" }).toString()}
        value={messageInput}
        onChange={handleInputChange}
        variant="standard"
        fullWidth
        multiline
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" sx={{ py: 2, ml: -1 }}>
          <EmojiChoose />
        </Stack>
        <IconButton color="primary" onClick={handleOnSend} size="large" sx={{ mr: 1.5 }}>
          <SendOutlined />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default InputArea;
