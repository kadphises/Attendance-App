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

export const addAuthEmail = (x) => {
  Cookie.set("auth_E", x);
};
export const getAuthEmail = () => {
  return Cookie.get("auth_E");
};
export const deleteAuthEmail = () => {
  Cookie.remove("auth_E");
};
