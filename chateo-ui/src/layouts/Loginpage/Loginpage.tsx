import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useLoginUserMutation } from "../../features/api/accountsApi";

import { LogoIcon } from "../../components/Icons/LogoIcon";
import { Input } from "../../components/Input/Input";
import { OpenEyeIcon } from "../../components/Icons/OpenEyeIcon";
import { CloseEyeIcon } from "../../components/Icons/CloseEyeIcon";

import { LoginData, AuthLoginErrorResponse } from "../../entities/account/model/types";

import "./Loginpage.css";

export const Loginpage = () => {
  /* скрыть/показать пароль */
  const [passInputType, setPassInputType] = useState("password");
  const togglePassInput = () => {
    if (passInputType === "password") {
      setPassInputType("text");
    } else {
      setPassInputType("password");
    }
  };

  /* валидация формы */
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  // запрос на вход
  const [loginUser] = useLoginUserMutation();

  // делаем запрос на вход + получение ошибок с бэка
  const navigate = useNavigate();
  const handleSubmitProcess = async (data: LoginData) => {
    try {
      const username = data.usernameValue;
      const password = data.passwordValue;
      const returned = await loginUser({ username, password }).unwrap();
      const key = returned?.key ?? null;
      localStorage.setItem("key", key);
      localStorage.setItem("username", username);
      navigate("/chats");
    } catch (error) {
      const errorResponse = error as AuthLoginErrorResponse;
      if (errorResponse.data?.username) {
        setError("usernameValue", { type: "custom", message: errorResponse.data?.username });
      }
      if (errorResponse.data?.password) {
        setError("passwordValue", { type: "custom", message: errorResponse.data?.password });
      }
      if (errorResponse.data?.non_field_errors) {
        if (errorResponse.data?.non_field_errors == "Unable to log in with provided credentials.") {
          setError("usernameValue", { type: "custom", message: "Неверные данные" });
          setError("passwordValue", { type: "custom", message: "Неверные данные" });
        } else {
          setError("usernameValue", { type: "custom", message: errorResponse.data?.non_field_errors });
        }
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitProcess(data);
        })}
      >
        <main className="login_main">
          <div className="login_logo">
            <LogoIcon className="login_logoicon" />
            <h1 className="login_h1">Chateo</h1>
          </div>

          <div className="login_body">
            <img className="login_img" src="../../../images/woman.png" alt="Мужчина пишет сообщение" />
            <div className="login_inputs">
              <div className="login_input">
                <Controller
                  control={control}
                  rules={{
                    required: "Обязательное поле",
                  }}
                  render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="usernameValue" name="usernameValue" placeholder="Имя пользователя" />}
                  name="usernameValue"
                />
                {errors.usernameValue && (
                  <div className="login_error">
                    <span className="login_error_text">{errors.usernameValue.message}</span>
                  </div>
                )}
              </div>
              <div className="login_input">
                <Controller
                  control={control}
                  rules={{
                    required: "Обязательное поле",
                  }}
                  render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type={passInputType} id="passwordValue" name="passwordValue" className="pr" placeholder="Пароль" />}
                  name="passwordValue"
                />
                <div className="login_svgs">
                  {passInputType === "text" && <OpenEyeIcon onClick={togglePassInput} className="login_eye_svg" />}
                  {passInputType === "password" && <CloseEyeIcon onClick={togglePassInput} className="login_eye_svg" />}
                </div>
                {errors.passwordValue && (
                  <div className="login_error">
                    <span className="login_error_text">{errors.passwordValue.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="login_buttons">
            <button type="submit" className="login_button">
              Войти
            </button>
            <a href="/auth/register" className="login_registerlink">
              Еще нет аккаунта?
            </a>
          </div>
        </main>
      </form>
    </>
  );
};
