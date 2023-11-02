import { getAllowedEmailList } from "./db";
import { fetchUserDate } from "./record-operation";

export const initialState = {
  allowedUsersList: [],
  isFetchingAllowedUsers: false,
  isFetchingTimeEnteries: false,
  timeEnteries: null,
};

export const attendenaceReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_ENTERIES_STATE":
      return { ...state, isFetchingTimeEnteries: action.payload };
    case "FETCH_ALLOWED_USER_STATE":
      return { ...state, isFetchingAllowedUsers: action.payload };
    case "SET_ALLOWED_USERS_LIST":
      return { ...state, allowedUsersList: action.payload };
    case "SET_TIME_ENTERIES":
      return { ...state, timeEnteries: action.payload };

    default:
      return state;
  }
};

export const asyncActionHandlers = {
  FETCH_USER_ENTERIES:
    ({ dispatch }) =>
    async () => {
      dispatch({ type: "FETCH_USER_ENTERIES_STATE", payload: true });
      const pList = await fetchUserDate();
      dispatch({ type: "SET_TIME_ENTERIES", payload: pList });
      dispatch({ type: "FETCH_USER_ENTERIES_STATE", payload: false });
    },
  FETCH_ALLOWED_USERS:
    ({ dispatch }) =>
    async () => {
      dispatch({ type: "FETCH_ALLOWED_USER_STATE", payload: true });
      const pList = await getAllowedEmailList();
      dispatch({ type: "SET_ALLOWED_USERS_LIST", payload: pList });
      dispatch({ type: "FETCH_ALLOWED_USER_STATE", payload: false });
    },
};
