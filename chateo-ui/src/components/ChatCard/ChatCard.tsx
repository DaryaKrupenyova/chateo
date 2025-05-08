import React from "react";

import { useGetUnreadMessQuery } from "../../features/api/chatsApi";

import type { User } from "../../entities/user/model/types";
import type { Message } from "../../entities/chat/model/types";

import "./ChatCard.css";

interface ChatCardProps {
  id: number;
  href: string;
  receiver: User;
  initiator: User;
  last_message: Message;
}

export const ChatCard: React.FC<ChatCardProps> = (props) => {
  // запрос чата
  const { data: count, isSuccess: isSuccessCount } = useGetUnreadMessQuery({ id: props.id });

  // Функция для форматирования timestamp
  const formatMessageTimestamp = (timestamp: string): string => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    // Сравниваем даты (без учета времени)
    const isToday = messageDate.getDate() === today.getDate() && messageDate.getMonth() === today.getMonth() && messageDate.getFullYear() === today.getFullYear();

    if (isToday) {
      // Форматируем время: ЧЧ:ММ
      return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      // Форматируем дату: ДД.ММ.ГГГГ
      const day = String(messageDate.getDate()).padStart(2, "0");
      const month = String(messageDate.getMonth() + 1).padStart(2, "0");
      const year = messageDate.getFullYear();
      return `${day}.${month}.${year}`;
    }
  };

  const myusername = localStorage.getItem("username") || "";

  if (isSuccessCount && props.last_message.text !== "") {
    return (
      <a href={props.href} className="chatcard_a">
        <div className="chatcard_main">
          <div className="chatcard_img">
            {props.initiator.username == myusername ? (
              <span className="chatcard_initials">{props.receiver.last_name && props.receiver.first_name ? `${props.receiver.last_name[0]}${props.receiver.first_name[0]}` : `${props.receiver.username[0]}`}</span>
            ) : (
              <span className="chatcard_initials">{props.initiator.last_name && props.initiator.first_name ? `${props.initiator.last_name[0]}${props.initiator.first_name[0]}` : `${props.initiator.username[0]}`}</span>
            )}
          </div>
          <div className="chatcard_info">
            <div className="chatcard_top_info">
              {props.initiator.username == myusername ? (
                <h2 className="chatcard_name">{props.receiver.last_name && props.receiver.first_name ? `${props.receiver.last_name} ${props.receiver.first_name}` : `${props.receiver.username}`}</h2>
              ) : (
                <h2 className="chatcard_name">{props.initiator.last_name && props.initiator.first_name ? `${props.initiator.last_name} ${props.initiator.first_name}` : `${props.initiator.username}`}</h2>
              )}
              <span className="chatcard_timestamp">{props.last_message.timestamp && formatMessageTimestamp(props.last_message.timestamp)}</span>
            </div>
            <div className="chatcard_bottom_info">
              <span className="chatcard_message">{props.last_message.text}</span>
              {props.last_message.timestamp && !props.last_message.is_read && props.last_message.sender.username !== myusername ? (
                <div className="chatcard_unread">
                  <span className="chatcard_unread_count">{count}</span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </a>
    );
  } else {
    return null;
  }
};
