import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./components/Blog/BlogList";
import DetailBlog from "./components/Blog/DetailBlog";
import FormIndex from "./components/Member";
import Account from "./components/Account/Account";
import MyProduct from "./components/Account/MyProduct";
import AddProduct from "./components/Account/AddProduct";
import UpdateProduct from "./components/Account/updateProduct";
import HomePage from "./components/Layout/HomePage";
import ProductDetail from "./components/Product/ProductDetail";
import CartProduct from "./components/Cart/CartProduct";
import Wishlist from "./components/Cart/WishList";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotFound from "./components/Layout/NotFound";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route axact path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blog/list" element={<BlogList />} />
          <Route path="/blog/detail/:id" element={<DetailBlog />} />
          <Route path="/login" element={<FormIndex />} />
          <Route path="/account/update" element={<Account />} />
          <Route path="/account/myproduct" element={<MyProduct />} />
          <Route path="/account/product/add" element={<AddProduct />} />
          <Route path="/account/product/update" element={<UpdateProduct />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/product/cart" element={<CartProduct />} />
          <Route path="/product/wishlist" element={<Wishlist />} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
