import { useGetChatsQuery } from "../../features/api/chatsApi";

import { Menu } from "../../widgets/Menu/Menu";
import { BurgerIcon } from "../../components/Icons/BurgerIcon";
import { ChatCard } from "../../components/ChatCard/ChatCard";
import { PlusIcon } from "../../components/Icons/PlusIcon";

import type { ChatCardType } from "../../entities/chat/model/types";

import "./Chatspage.css";

export const Chatspage = () => {
  // запрос данных с бэка
  const { data: chats, isSuccess: isSuccessChats } = useGetChatsQuery();

  if (isSuccessChats) {
    return (
      <>
        <Menu burger={<BurgerIcon className="chats_burgericon" />} />

        <main className="chats_main">
          <div className="chats_header">
            <h1 className="chats_h1">Чаты</h1>
          </div>
          <div className="chats_body">
            {chats
              .slice()
              .sort((a: ChatCardType, b: ChatCardType) => a.id - b.id)
              .map((chat: ChatCardType) => (
                <ChatCard key={`/chat/${chat.id}`} id={chat.id} href={`/chat/${chat.id}`} receiver={chat.receiver} initiator={chat.initiator} last_message={chat.last_message} />
              ))}
          </div>
        </main>

        <a href="/contacts" className="chats_addchat">
          <PlusIcon className="chats_plusicon" />
        </a>
      </>
    );
  } else {
    return null;
  }
};
