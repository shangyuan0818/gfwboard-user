import React from "react";

// project imports
import { ShopProvider } from "@/sections/subscription/buyPage/context";
import ProductsSection from "@/sections/subscription/buyPage/productsSection";

const PlanPage: React.FC = () => (
  <ShopProvider>
    <ProductsSection />
  </ShopProvider>
);

export default PlanPage;
