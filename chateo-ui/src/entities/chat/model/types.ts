import type { User, FullUser } from "../../user/model/types";

export interface Chat {
  id: number;
  initiator: User;
  receiver: User;
  message_set: Message[];
}

export interface ChatCardType {
  id: number;
  initiator: User;
  receiver: User;
  last_message: Message;
}

export interface Message {
  attachment: null;
  conversation_id: number;
  is_read: boolean;
  sender: FullUser;
  text: string;
  timestamp: string;
}
