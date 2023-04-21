import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import MenuLeft from "./components/Layout/MenuLeft";
import MenuAcc from "./components/Layout/MenuAcc";
import { useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Slider from "./components/Layout/slider";
function App(props) {
  let params1 = useLocation();

  return (
    <>
      <CartProvider>
        <Header />
        {/* <Slider /> */}
        <section>
          <div className="container">
            <div className="row">
              {params1["pathname"].includes("account") ? (
                <MenuAcc />
              ) : <MenuLeft /> && params1["pathname"].includes("login") ? (
                <></>
              ) : <MenuLeft /> &&
                params1["pathname"].includes("/product/cart") ? (
                <></>
              ) : (
                <MenuLeft />
              )}

              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
