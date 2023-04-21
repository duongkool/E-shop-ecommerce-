import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./types";

export const addCounter = () => {
  return {
    type: ADD_TO_WISHLIST,
  };
};

export const removeCounter = () => {
  return {
    type: REMOVE_FROM_WISHLIST,
  };
};
