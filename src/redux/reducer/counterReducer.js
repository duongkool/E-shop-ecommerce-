const dataWishlist = JSON.parse(localStorage.getItem("dataWishList"));
const initialState = {
  count: dataWishlist ? Object.keys(dataWishlist).length : 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        count: state.count + 1,
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
