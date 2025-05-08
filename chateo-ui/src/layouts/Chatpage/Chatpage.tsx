import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetChatQuery } from "../../features/api/chatsApi";
import { BackIcon } from "../../components/Icons/BackIcon";
import { SendIcon } from "../../components/Icons/SendIcon";
import type { Message } from "../../entities/chat/model/types";
import "./Chatpage.css";

export const Chatpage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const chatIdNum = Number(chatId);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const webSocket = useRef<WebSocket | null>(null);
  const webSocketConnectionStatus = useRef<boolean | null>(null);
  const navigate = useNavigate();
  const myusername = localStorage.getItem("username") || "";
  const key = localStorage.getItem("key") || "";

  const { data: chat, isSuccess: isSuccessChat } = useGetChatQuery({ id: chatIdNum });

  // Объединяем сообщения из API и WebSocket
  useEffect(() => {
    if (chat?.message_set) {
      setAllMessages(chat.message_set);
    }
  }, [chat]);

  // WebSocket подключение
  useEffect(() => {
    if (!chatIdNum) return;

    const wsUrl = `ws://localhost:8000/ws/chat/${chatIdNum}/?authorization=${key}`;
    webSocket.current = new WebSocket(wsUrl);
    webSocketConnectionStatus.current = false;

    webSocket.current.onopen = () => {
      webSocketConnectionStatus.current = true;
      console.log(`WebSocket connection opened.`, webSocketConnectionStatus.current);
    };

    webSocket.current.onclose = (event) => {
      webSocketConnectionStatus.current = false;
      console.log(`WebSocket connection closed with code ${event.code}`, webSocketConnectionStatus.current);
    };

    webSocket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message:", data);

        // Нормализуем данные сообщения
        const normalizedMessage: Message = {
          text: data.message || data.text || "",
          sender: data.sender,
          timestamp: data.timestamp || new Date().toISOString(),
          // Добавляем остальные обязательные поля из интерфейса
          attachment: null,
          conversation_id: chatIdNum,
          is_read: false,
        };

        setAllMessages((prev) => [normalizedMessage, ...prev]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    return () => {
      webSocketConnectionStatus.current = false;
      webSocket.current?.close();
    };
  }, [chatIdNum, key]);

  useEffect(() => {
    console.log("allMessages", allMessages);
  }, [allMessages]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !webSocket.current) return;

    const message = {
      message: newMessage,
    };

    webSocket.current.send(JSON.stringify(message));
    setNewMessage("");
  }, [newMessage]);

  const renderMessage = useCallback(
    (message: Message) => {
      const isMyMessage = message.sender.username === myusername;
      return (
        <div key={`${message.timestamp}-${message.sender.username}`} className={`chat_message_group ${isMyMessage ? "chat_my_message_group" : "chat_partner_message_group"}`}>
          <div className={`chat_message_div ${isMyMessage ? "chat_my_message_div" : "chat_partner_message_div"}`}>
            <p className={`chat_message ${isMyMessage ? "chat_my_message" : "chat_partner_message"}`}>{message.text}</p>
          </div>
        </div>
      );
    },
    [myusername]
  );

  if (!isSuccessChat) {
    return <div>Загрузка истории...</div>;
  } else {
    return (
      <main className="chat_main">
        <div className="chat_header">
          <div onClick={() => navigate(`/chats`)} className="chat_backicon_div">
            <BackIcon className="chat_backicon" />
          </div>
          {chat.receiver.username == myusername ? (
            <h1 className="chat_h1">{chat.initiator.first_name && chat.initiator.last_name ? `${chat.initiator.last_name} ${chat.initiator.first_name}` : chat.initiator.username}</h1>
          ) : (
            <h1 className="chat_h1">{chat.receiver.first_name && chat.receiver.last_name ? `${chat.receiver.last_name} ${chat.receiver.first_name}` : chat.receiver.username}</h1>
          )}
        </div>
        <div className="chat_body">{allMessages.map(renderMessage)}</div>
        <div className="chat_sendblock">
          <input className="chat_sendinput" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Напишите сообщение..." onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <SendIcon className="chat_sendbutton" onClick={handleSendMessage} />
        </div>
      </main>
    );
  }
};
