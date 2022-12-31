import lo from "lodash-es";
import type Plan from "@/model/plan";

export enum PlanType {
  PERIOD = "period", // 周期
  TRAFFIC = "traffic" // 流量，一次性
}

export enum PaymentPeriod {
  ONETIME = "onetime", // 一次性
  MONTHLY = "monthly", // 每月
  QUARTERLY = "quarterly", // 每季度
  HALF_YEARLY = "semiannual", // 每半年
  YEARLY = "yearly", // 每年
  TWO_YEARLY = "biennially", // 每两年
  THREE_YEARLY = "triennially" // 每三年
}
