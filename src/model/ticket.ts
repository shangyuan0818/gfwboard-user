export interface TicketPayload {
  subject: string;
  level: number;
  message: string;
}

export default interface Ticket {
  created_at: number;
  updated_at: number;
  id: number;
  level: number;
  reply_status: 0 | 1;
  status: 0 | 1;
  user_id: number;
  message: Message[];
}

export interface Message {
  id: number;
  user_id: number;
  ticket_id: number;
  message: string;
  created_at: number;
  updated_at: number;
  is_me: boolean;
}

export interface ReplyTicketPayload {
  id: number;
  message: string;
}
