import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useRegisterUserMutation } from "../../features/api/accountsApi";

import { LogoIcon } from "../../components/Icons/LogoIcon";
import { Input } from "../../components/Input/Input";
import { OpenEyeIcon } from "../../components/Icons/OpenEyeIcon";
import { CloseEyeIcon } from "../../components/Icons/CloseEyeIcon";

import { RegisterData, AuthRegisterErrorResponse } from "../../entities/account/model/types";

import "./Registerpage.css";

export const Registerpage = () => {
  /* скрыть/показать пароль */
  const [passInputType, setPassInputType] = useState("password");
  const togglePassInput = () => {
    if (passInputType === "password") {
      setPassInputType("text");
    } else {
      setPassInputType("password");
    }
  };
  const [passInputType2, setPassInputType2] = useState("password");
  const togglePassInput2 = () => {
    if (passInputType2 === "password") {
      setPassInputType2("text");
    } else {
      setPassInputType2("password");
    }
  };

  /* валидация формы */
  const {
    control,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  // запрос на регистрацию
  const [registerUser] = useRegisterUserMutation();

  // делаем запрос на регистрацию + получение ошибок с бэка
  const navigate = useNavigate();
  const handleSubmitProcess = async (data: RegisterData) => {
    try {
      const username = data.usernameValue;
      const password1 = data.passwordValue1;
      const password2 = data.passwordValue2;
      const returned = await registerUser({ username, password1, password2 }).unwrap();
      const key = returned?.key ?? null;
      localStorage.setItem("key", key);
      localStorage.setItem("username", username);
      navigate("/chats");
    } catch (error) {
      const errorResponse = error as AuthRegisterErrorResponse;
      if (errorResponse.data?.username) {
        setError("usernameValue", { type: "custom", message: errorResponse.data?.username });
      }
      if (errorResponse.data?.password1) {
        if (errorResponse.data?.password1 == "This password is too common.") {
          setError("passwordValue1", { type: "custom", message: "Этот пароль слишком распространен" });
        } else if (errorResponse.data?.password1 == "This password is entirely numeric.") {
          setError("passwordValue1", { type: "custom", message: "Этот пароль полностью состоит из цифр." });
        } else {
          setError("passwordValue1", { type: "custom", message: errorResponse.data?.password1 });
        }
      }
      if (errorResponse.data?.password2) {
        setError("passwordValue2", { type: "custom", message: errorResponse.data?.password2 });
      }
      if (errorResponse.data?.non_field_errors) {
        if (errorResponse.data?.non_field_errors == "The password is too similar to the username.") {
          setError("passwordValue1", { type: "custom", message: "Пароль слишком похож на имя пользователя" });
        } else {
          setError("usernameValue", { type: "custom", message: errorResponse.data?.non_field_errors });
        }
      }
    }
  };

  // для сравнения пароля и подтверждения пароля
  const passwordValue = watch("passwordValue1", "");

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitProcess(data);
        })}
      >
        <main className="register_main">
          <div className="register_logo">
            <LogoIcon className="register_logoicon" />
            <h1 className="register_h1">Chateo</h1>
          </div>

          <div className="register_body">
            <img className="register_img" src="../../../images/man.png" alt="Мужчина пишет сообщение" />
            <div className="register_inputs">
              <div className="register_input">
                <Controller
                  control={control}
                  rules={{
                    required: "Обязательное поле",
                  }}
                  render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="usernameValue" name="usernameValue" placeholder="Имя пользователя" />}
                  name="usernameValue"
                />
                {errors.usernameValue && (
                  <div className="register_error">
                    <span className="register_error_text">{errors.usernameValue.message}</span>
                  </div>
                )}
              </div>
              <div className="register_input">
                <Controller
                  control={control}
                  rules={{
                    required: "Обязательное поле",
                    minLength: {
                      value: 8,
                      message: "Не короче 8 символов",
                    },
                  }}
                  render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type={passInputType} id="passwordValue1" name="passwordValue1" className="pr" placeholder="Пароль" />}
                  name="passwordValue1"
                />
                <div className="register_svgs">
                  {passInputType === "text" && <OpenEyeIcon onClick={togglePassInput} className="register_eye_svg" />}
                  {passInputType === "password" && <CloseEyeIcon onClick={togglePassInput} className="register_eye_svg" />}
                </div>
                {errors.passwordValue1 && (
                  <div className="register_error">
                    <span className="register_error_text">{errors.passwordValue1.message}</span>
                  </div>
                )}
              </div>
              <div className="register_input">
                <Controller
                  control={control}
                  rules={{
                    required: "Обязательное поле",
                    validate: (value) => value === passwordValue || "Подтверждение пароля не совпадает",
                  }}
                  render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type={passInputType2} id="passwordValue2" name="passwordValue2" className="pr" placeholder="Пароль ещё раз" />}
                  name="passwordValue2"
                />
                <div className="register_svgs">
                  {passInputType2 === "text" && <OpenEyeIcon onClick={togglePassInput2} className="register_eye_svg" />}
                  {passInputType2 === "password" && <CloseEyeIcon onClick={togglePassInput2} className="register_eye_svg" />}
                </div>
                {errors.passwordValue2 && (
                  <div className="register_error">
                    <span className="register_error_text">{errors.passwordValue2.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="register_buttons">
            <button type="submit" className="register_button">
              Зарегистрироваться
            </button>
            <a href="/auth/login" className="register_registerlink">
              Уже есть аккаунт?
            </a>
          </div>
        </main>
      </form>
    </>
  );
};
