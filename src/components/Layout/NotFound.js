import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  return (
    <>
      <div class="container text-center">
        <div class="logo-404">
          <a href="index.html">
            <img
              src={`http://localhost/laravel8/public/upload/icon/404.png`}
              alt=""
            />
          </a>
        </div>
        <div class="content-404">
          <img src="images/404/404.png" class="img-responsive" alt="" />
          <h1>
            <b>OPPS!</b> We Couldn’t Find this Page
          </h1>
          <p>
            Uh... So it looks like you brock something. The page you are looking
            for has up and Vanished.
          </p>
          <h2>
            <a href="index.html">Bring me back Home</a>
          </h2>
        </div>
      </div>
    </>
  );
};
export default NotFound;
