import { LogoIcon } from "../../components/Icons/LogoIcon";

import "./Homepage.css";

export const Homepage = () => {
  return (
    <>
      <main className="home_main">
        <div className="home_logo">
          <LogoIcon className="home_logoicon" />
          <h1 className="home_h1">Chateo</h1>
        </div>
        <div className="home_body">
          <img className="home_img" src="../../../images/people.png" alt="Люди переписываются" />
          <h2 className="home_h2">Легко общайтесь с семьей и друзьями из разных стран</h2>
        </div>
        <a href="/auth/login" className="home_a">
          Начать
        </a>
      </main>
    </>
  );
};
