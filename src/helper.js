import Cookie from "js-cookie";

export const addToken = () => {
  Cookie.set("auth", "true");
};
export const getToken = () => {
  return Cookie.get("auth");
};
export const deleteToken = () => {
  Cookie.remove("auth");
};
