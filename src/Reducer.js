export const initialState = {
  previousList: [],
  particularUserData: null,
};

export const attendenaceReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state };
    default:
      return state;
  }
};
