import instance from ".";
import { LoginForm, RegisterForm, cart } from "../interface";

const signup = (url: string, data: RegisterForm) => {
  return instance.post(url, data);
};

const signin = (url: string, data: LoginForm) => {
  return instance.post(url, data);
};

const getUser = (url: string, id: string) => {
  return instance.get(`${url}/${id}`);
};

const addToCart = (url: string, data: cart) => {
  return instance.put(url, data);
};

const auth = (url: string, token: string) => {
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { signup, signin, auth, addToCart, getUser };
