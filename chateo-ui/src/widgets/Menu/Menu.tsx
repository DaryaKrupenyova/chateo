import React, { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { useGetUserQuery } from "../../features/api/chatsApi";

import { ContactIcon } from "../../components/Icons/ContactIcon";
import { ArrowIcon } from "../../components/Icons/ArrowIcon";
import { ChatIcon } from "../../components/Icons/ChatIcon";
import { LogoutIcon } from "../../components/Icons/LogoutIcon";

import "./Menu.css";

type MenuProps = {
  burger: ReactNode;
};

export const Menu: React.FC<MenuProps> = ({ burger }) => {
  // запрос данных с бэка
  const myusername = localStorage.getItem("username");
  const { data: me, isSuccess: isSuccessMe } = useGetUserQuery({ username: myusername! }, { skip: !myusername });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (menuRef.current && !menuRef.current.contains(target) && burgerRef.current && !burgerRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <>
      <div ref={burgerRef} onClick={() => setIsOpen(!isOpen)} className="burger-wrapper">
        {burger}
      </div>

      <div ref={menuRef} className={`sidebar-menu ${isOpen ? "open" : ""}`}>
        <div className="menu_top">
          <a href="/account" className="menu_accountlink">
            <div className="menu_accountimg">
              <span className="menu_accountinitials">{isSuccessMe && me.last_name && me.first_name ? `${me.last_name[0]}${me.first_name[0]}` : myusername ? `${myusername[0]}` : " "}</span>
            </div>
            <div className="menu_accountinfo">
              <span className="menu_name">{isSuccessMe ? `${me.last_name} ${me.first_name}` : " "}</span>
              <span className="menu_username">{myusername ? myusername : " "}</span>
            </div>
          </a>
          <div className="menu_links">
            <a href="/contacts" className="menu_link">
              <div className="menu_leftlink">
                <ContactIcon className="menu_iconlink" />
                <span className="menu_titlelink">Контакты</span>
              </div>
              <ArrowIcon className="menu_arrowlink" />
            </a>
            <a href="/chats" className="menu_link">
              <div className="menu_leftlink">
                <ChatIcon className="menu_iconlink" />
                <span className="menu_titlelink">Чаты</span>
              </div>
              <ArrowIcon className="menu_arrowlink" />
            </a>
          </div>
        </div>
        <div onClick={handleLogout} className="menu_logoutlink">
          <LogoutIcon className="menu_iconlink" />
          <span className="menu_titlelink">Выйти</span>
        </div>
      </div>
    </>
  );
};
