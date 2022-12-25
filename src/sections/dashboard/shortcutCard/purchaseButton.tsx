import React, { useMemo } from "react";
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import Avatar from "@/components/@extended/Avatar";
import { QuestionOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "@/store/services/api";
import { use } from "i18next";

const PurchaseButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: userInfo } = useGetUserInfoQuery();
  const hasPurchased = useMemo<boolean>(() => userInfo?.plan_id !== null, [userInfo]);

  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(hasPurchased ? `/plan/${userInfo?.plan_id}` : "/plan");
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="Basic" type="combined" color="success">
            <ShoppingOutlined />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant={"body1"} noWrap>
              {t("dashboard.shortcut.purchase.primary", {
                context: hasPurchased ? "purchased" : "not_purchased"
              })}
            </Typography>
          }
          secondary={
            <Typography variant={"caption"} color={"secondary"} noWrap>
              {t("dashboard.shortcut.purchase.secondary", {
                context: hasPurchased ? "purchased" : "not_purchased"
              })}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default PurchaseButton;
