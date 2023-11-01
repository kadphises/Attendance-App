import Cookie from "js-cookie";

export const addToken = () => {
  Cookie.set("auth", "true");
};
export const getToken = () => {
  Cookie.get("auth");
};
export const deleteToken = () => {
  Cookie.remove("auth");
};
