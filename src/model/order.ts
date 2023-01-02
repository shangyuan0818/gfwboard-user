import { PaymentPeriod } from "@/types/plan";

export interface OrderPayload {
  plan_id: number;
  period: PaymentPeriod;
  coupon_code?: string;
}
