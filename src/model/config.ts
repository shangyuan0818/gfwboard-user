export default interface Config {
  is_telegram: 0 | 1;
  telegram_discuss_link: string;
  stripe_pk: null;
  withdraw_methods: string[];
  withdraw_close: number;
  currency: string;
  currency_symbol: string;
  commission_distribution_enable: number;
  commission_distribution_l1: null;
  commission_distribution_l2: null;
  commission_distribution_l3: null;
}
