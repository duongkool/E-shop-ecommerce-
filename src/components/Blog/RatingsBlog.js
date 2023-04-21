import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { ratingApi, getRatingApi } from "../../services/UserServices";
const RatingsBlog = (props) => {
  const userData = JSON.parse(localStorage?.getItem("data"));
  const [dataRate, setDataRate] = useState(null);
  const [rating, setRating] = useState(0);
  const idBlog = props.data.id;
  const idUser = userData.Auth.id;
  let accessToken = userData.token;

  useEffect(() => {
    if (props.data.id) {
      getRatingSum();
    }
  }, [props.data]);

  const getRatingSum = async () => {
    let res = await getRatingApi(idBlog);
    if (res && res.data) {
      setDataRate(res.data.data);
      let total = 0;
      let count = 0;
      Object.keys(res.data.data).forEach((key) => {
        if (res.data.data[key].hasOwnProperty("rate")) {
          total += res.data.data[key].rate;
          count++;
        }
      });
      const average = total / count;
      if (average) {
        setRating(average);
      }
    }
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
    sendRating(newRating);
  };
  const sendRating = async (newRating) => {
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    if (userData) {
      let res = await ratingApi(idUser, idBlog, newRating, config);
      console.log(res);
    } else {
      alert("dang nhap de danh gia");
    }
  };

  return (
    <>
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <StarRatings
              rating={rating}
              starRatedColor="yellow"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </li>
          {dataRate && (
            <li className="color">( {Object.keys(dataRate).length} votes)</li>
          )}
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color" href="">
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href="">
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href="">
              Girls
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default RatingsBlog;
