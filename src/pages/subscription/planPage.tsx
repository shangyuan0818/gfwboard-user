import React from "react";
import { ShopProvider } from "@/sections/subscription/buyPage/context";
import FilterCard from "@/sections/subscription/buyPage/filterCard";

const PlanPage: React.FC = () => {
  return (
    <ShopProvider>
      <FilterCard />
    </ShopProvider>
  );
};

export default PlanPage;
