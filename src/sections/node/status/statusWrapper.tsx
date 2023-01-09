import React from "react";
import MainCard from "@/components/MainCard";

const StatusWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <MainCard className={className} content={false}>
    {children}
  </MainCard>
);

export default StatusWrapper;
