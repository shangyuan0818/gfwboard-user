import React from "react";

// project imports
import { ShopProvider } from "@/sections/subscription/buyPage/context";
import ProductsSection from "@/sections/subscription/buyPage/productsSection";
import useTitle from "@/hooks/useTitle";

const PlanList: React.FC = () => {
  useTitle("buy-plan");

  return (
    <ShopProvider>
      <ProductsSection />
    </ShopProvider>
  );
};

export default PlanList;
