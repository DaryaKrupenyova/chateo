import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Homepage } from "./layouts/Homepage/Homepage";
import { Loginpage } from "./layouts/Loginpage/Loginpage";
import { Registerpage } from "./layouts/Registerpage/Registerpage";
import { Contactspage } from "./layouts/Contactspage/Contactspage";
import { Chatspage } from "./layouts/Chatspage/Chatspage";
import { Chatpage } from "./layouts/Chatpage/Chatpage";
import { Accountpage } from "./layouts/Accountpage/Accountpage";
import { NoFoundpage } from "./layouts/NoFoundpage/NoFoundpage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Homepage />,
  },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Loginpage /> },
      { path: "register", element: <Registerpage /> },
    ],
  },
  {
    path: "/contacts",
    element: <Contactspage />,
  },
  {
    path: "/chats",
    element: <Chatspage />,
  },
  {
    path: "/chat/:chatId",
    element: <Chatpage />,
  },
  {
    path: "/account",
    element: <Accountpage />,
  },
  {
    path: "*",
    element: <NoFoundpage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
