import { logDOM } from "@testing-library/react";
import { PostNewComment } from "../../services/UserServices";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CommentSection = (props) => {
  const navigate = useNavigate();
  const [newComment, setNewcomment] = useState("");
  const [comment, setComment] = useState([]);
  // const [idRep, setIdRep] = useState("");
  const [replyInputId, setReplyInputId] = useState(null);

  useEffect(() => {
    if (props.data.comment) {
      setComment(props.data.comment);
    }
  }, [props.data]);

  const handleSubmitComment = async (replyInputId) => {
    const isLogin = localStorage.getItem("data");
    if (isLogin) {
      if (!newComment) {
        alert("vui long nhap noi dung");
      } else {
        const userData = JSON.parse(localStorage.getItem("data"));
        const idBlog = props.data.id;
        let accessToken = userData.token;
        const idUser = userData.Auth.id;
        const imageUser = userData.Auth.avatar;
        const nameUser = userData.Auth.name;

        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        };

        let res = await PostNewComment(
          idBlog,
          idUser,
          replyInputId ? replyInputId : 0,
          newComment,
          imageUser,
          nameUser,
          config
        );
        if (res && res.data && res.data.data.comment) {
          console.log(res);
          setComment([res.data.data, ...comment]);
          setNewcomment("");
        }
      }
    } else {
      alert("đăng nhập để bình luận");
      navigate("/login");
    }
  };

  const handleReplyClick = (id) => {
    setReplyInputId(id);
  };
  const renderComment = () => {
    if (comment.length > 0) {
      return comment.map((item, index) => {
        return (
          <>
            {item.id_comment == 0 && (
              <li key={`comment-${index}`} className="media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src="images/blog/man-two.jpg"
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user"></i>
                      {item.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o"></i> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar"></i> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{item.comment}</p>
                  <a
                    className="btn btn-primary"
                    onClick={() => handleReplyClick(item.id)}
                  >
                    <i className="fa fa-reply"></i>Replay
                  </a>
                </div>
              </li>
            )}

            {comment.map((subItem, subIndex) => {
              if (subItem.id_comment === item.id) {
                return (
                  <li
                    key={`child-cmt-${subIndex}`}
                    className="media second-media"
                  >
                    <a className="pull-left" href="#">
                      <img
                        className="media-object"
                        src="images/blog/man-three.jpg"
                        alt=""
                      />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li>
                          <i className="fa fa-user"></i>
                          {subItem.name_user}
                        </li>
                        <li>
                          <i className="fa fa-clock-o"></i> 1:33 pm
                        </li>
                        <li>
                          <i className="fa fa-calendar"></i> DEC 5, 2013
                        </li>
                      </ul>
                      <p>{subItem.comment}</p>
                      <a className="btn btn-primary" href="">
                        <i className="fa fa-reply"></i>Replay
                      </a>
                    </div>
                  </li>
                );
              }
            })}

            {item.id === replyInputId && (
              <li className="media second-media">
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src="images/blog/man-three.jpg"
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user"></i> {item.name_user}
                    </li>
                  </ul>
                  <div className="reply-conten">
                    <input
                      type="text"
                      placeholder="Nhập bình luận..."
                      onChange={(e) => setNewcomment(e.target.value)}
                      value={newComment}
                    />

                    <button
                      onClick={() => handleSubmitComment(replyInputId)}
                      className="btn btn-primary"
                    >
                      post comment
                    </button>
                  </div>
                </div>
              </li>
            )}
          </>
        );
      });
    }
  };

  return (
    <>
      <div className="response-area">
        <h2>{comment.length} RESPONSE</h2>
        <ul className="media-list">{renderComment()}</ul>
      </div>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>

            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                onChange={(e) => setNewcomment(e.target.value)}
                value={newComment}
                name="message"
                rows="11"
              ></textarea>
              <button
                onClick={() => handleSubmitComment(0)}
                className="btn btn-primary"
              >
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommentSection;
