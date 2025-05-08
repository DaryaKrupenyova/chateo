export interface LoginData {
  usernameValue: string;
  passwordValue: string;
}

export interface RegisterData {
  usernameValue: string;
  passwordValue1: string;
  passwordValue2: string;
}

export interface AuthLoginErrorResponse {
  data?: {
    username?: string;
    password?: string;
    non_field_errors?: string;
  };
}

export interface AuthRegisterErrorResponse {
  data?: {
    username?: string;
    password1?: string;
    password2?: string;
    non_field_errors?: string;
  };
}
