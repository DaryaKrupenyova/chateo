import { LogoIcon } from "../../components/Icons/LogoIcon";

import "./NoFoundpage.css";

export const NoFoundpage = () => {
  return (
    <>
      <main className="nofound_main">
        <div className="nofound_logo">
          <LogoIcon className="nofound_logoicon" />
          <h1 className="nofound_h1">Chateo</h1>
        </div>
        <div className="nofound_body">
          <img className="nofound_img" src="../../../images/people.png" alt="Люди переписываются" />
          <h2 className="nofound_h2">Такой страницы нет</h2>
        </div>
        <a href="/" className="nofound_a">
          На главную
        </a>
      </main>
    </>
  );
};
