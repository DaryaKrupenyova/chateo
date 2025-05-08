import React from "react";
import { useNavigate } from "react-router-dom";

import { useStartChatMutation } from "../../features/api/chatsApi";

import "./Contact.css";

interface ContactProps {
  username: string;
  first_name: string | null;
  last_name: string | null;
}

export const Contact: React.FC<ContactProps> = (props) => {
  // запрос на создание чата
  const [startChat] = useStartChatMutation();

  // делаем запрос на создание чата
  const navigate = useNavigate();
  const handlerClickContact = async (username: string) => {
    try {
      const response = await startChat({ username }).unwrap();
      navigate(`/chat/${response.id}`);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div
      onClick={() => {
        handlerClickContact(props.username);
      }}
      className="contact_main"
    >
      <div className="contact_img">
        <span className="contact_initials">{props.last_name && props.first_name ? `${props.last_name[0]}${props.first_name[0]}` : `${props.username[0]}`}</span>
      </div>
      <h2 className="contact_h2">{props.last_name && props.first_name ? `${props.last_name} ${props.first_name}` : `${props.username}`}</h2>
    </div>
  );
};
