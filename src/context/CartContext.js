import { createContext, useState } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const dataCart = JSON.parse(localStorage.getItem("dataCart"));
  const init = Object.keys(dataCart).length ? Object.keys(dataCart).length : 0;
  const [cartCount, setCartCount] = useState(init);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
