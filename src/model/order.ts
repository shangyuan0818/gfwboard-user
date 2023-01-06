import { PaymentPeriod } from "@/types/plan";
import Plan from "@/model/plan";

export enum OrderStatus {
  PENDING = 0, // 未支付
  PAID = 1, // 已支付
  CANCELLED = 2 // 已取消
}

export interface OrderPayload {
  plan_id: number;
  period: PaymentPeriod;
  coupon_code?: string;
}

export default interface Order {
  id: number;
  invite_user_id: null;
  user_id: number;
  plan_id: number;
  coupon_id: null;
  payment_id: null;
  type: number;
  period: PaymentPeriod;
  trade_no: string;
  callback_no: null;
  total_amount: number;
  handling_amount: null;
  discount_amount: null;
  surplus_amount: null;
  refund_amount: null;
  balance_amount: null;
  surplus_order_ids: null;
  status: OrderStatus;
  commission_status: number;
  commission_balance: number;
  actual_commission_balance: null;
  paid_at: null;
  created_at: number;
  updated_at: number;
  plan: Plan;
  try_out_plan_id: number;
}
