import { useGetUsersQuery } from "../../features/api/chatsApi";

import { Menu } from "../../widgets/Menu/Menu";
import { BurgerIcon } from "../../components/Icons/BurgerIcon";
import { Contact } from "../../components/Contact/Contact";

import type { User } from "../../entities/user/model/types";

import "./Contactspage.css";

export const Contactspage = () => {
  // запрос данных с бэка
  const { data: users, isSuccess: isSuccessUsers } = useGetUsersQuery();

  if (isSuccessUsers) {
    return (
      <>
        <Menu burger={<BurgerIcon className="contacts_burgericon" />} />

        <main className="contacts_main">
          <div className="contacts_header">
            <h1 className="contacts_h1">Контакты</h1>
          </div>
          <div className="contacts_body">
            {users
              .slice()
              .sort((a: User, b: User) => a.username.localeCompare(b.username))
              .map((user: User) => (
                <Contact key={`/user/${user.username}`} username={user.username} first_name={user.first_name || null} last_name={user.last_name || null} />
              ))}
          </div>
        </main>
      </>
    );
  } else {
    return null;
  }
};
