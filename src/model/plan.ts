export default interface Plan {
  id: number;
  group_id: number;
  transfer_enable: number;
  name: string;
  speed_limit: null | number;
  show: number;
  sort: number;
  renew: number;
  content: string;
  month_price: number;
  quarter_price: number;
  half_year_price: number;
  year_price: number;
  two_year_price: null;
  three_year_price: number | null;
  onetime_price: number | null;
  reset_price: number;
  reset_traffic_method: null;
  capacity_limit: null;
  created_at: number;
  updated_at: number;
}
