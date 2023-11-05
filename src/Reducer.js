import { getAllowedEmailList } from "./db";
import { fetchUserDate } from "./record-operation";

export const initialState = {
  allowedUsersList: [],
  isFetchingAllowedUsers: false,
  isFetchingTimeEnteries: false,
  timeEnteries: null,
  summary: null,
  cInEnabled: true,
  cOutEnabled: true,
  todayEntry: null,
};
export const getStatusCounter = (list) => {
  if (!list || !list?.length) return null;
  else {
    let total = 0;
    list.forEach((element) => {
      if (element.checkInTime && element.checkOutTime) {
        const month = new Date().getMonth();
        const lastEntryMonth = new Date(element.checkInTime).getMonth();
        if (month === lastEntryMonth) {
          const cIn = element.checkInTime;
          const cOut = element.checkOutTime;
          total = total + cOut - cIn - 9 * 60 * 60 * 1000;
        }
      }
    });
    return { sum_time: Math.abs(total), status: total >= 0 ? true : false };
  }
};
export const checkBtnState = (list) => {
  if (!list) return { cIn: false, cOut: false };
  if (list.length === 0) return { cIn: true, cOut: true };
  else {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const lastEntry = list[list.length - 1];
    const lastEntryMonth = new Date(lastEntry.checkInTime).getMonth();
    const lastEntryDate = new Date(lastEntry.checkInTime).getDate();
    /**
    corresponds that entry is created and is of today it means created by checkInEnabled */
    if (lastEntry && lastEntryDate && lastEntryMonth) {
      if (
        date === lastEntryDate &&
        lastEntryMonth === month &&
        lastEntry?.checkInTime &&
        lastEntry?.checkOutTime
      )
        return { cIn: false, cOut: false };
      if (
        date === lastEntryDate &&
        lastEntryMonth === month &&
        lastEntry?.checkInTime &&
        !lastEntryDate?.checkOutTime
      )
        return { cIn: false, cOut: true };
      if (lastEntryDate === date - 1) return { cIn: true, cOut: true };
    }

    return { cIn: true, cOut: true };
  }
};
const getTodayEntry = (list) => {
  if (!list || !list.length) return null;
  else {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const lastEntry = list[list.length - 1];
    const lastEntryMonth = new Date(lastEntry.checkInTime).getMonth();
    const lastEntryDate = new Date(lastEntry.checkInTime).getDate();
    if (date === lastEntryDate && lastEntryMonth === month && lastEntry)
      return lastEntry;
  }
};
export const attendenaceReducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_USER_ENTERIES_STATE":
      return { ...state, isFetchingTimeEnteries: payload };
    case "FETCH_ALLOWED_USER_STATE":
      return { ...state, isFetchingAllowedUsers: payload };
    case "SET_ALLOWED_USERS_LIST":
      return { ...state, allowedUsersList: payload };
    case "SET_TIME_ENTERIES": {
      const sC = getStatusCounter(payload);
      // return { ...state, timeEnteries: action.payload };

      const { cIn, cOut } = checkBtnState(payload);
      const lEn = getTodayEntry(payload);
      return {
        ...state,
        timeEnteries: payload,
        summary: sC,
        cInEnabled: cIn,
        cOutEnabled: cOut,
        todayEntry: lEn,
      };
    }

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
