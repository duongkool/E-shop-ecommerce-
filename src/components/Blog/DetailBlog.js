import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDetailBlog } from "../../services/UserServices";
import CommentSection from "./comments";
import RatingsBlog from "./RatingsBlog";

const DetailBlog = (props) => {
  const params = useParams();
  const DetalId = params.id;
  const [data, setData] = useState("");

  useEffect(() => {
    fetchBlogDetail();
  }, []);
  const fetchBlogDetail = async () => {
    let res = await FetchDetailBlog(DetalId);
    setData(res.data.data);
  };

  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {data && (
            <div className="single-blog-post">
              <h3>{data.title}</h3>
              <div className="post-meta">
                <ul>
                  <li>
                    <i className="fa fa-user"></i> Mac Doe
                  </li>
                  <li>
                    <i className="fa fa-clock-o"></i> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar"></i> DEC 5, 2013
                  </li>
                </ul>
                {/* <!-- <span>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star-half-o"></i>
								</span> --> */}
              </div>
              <a href="">
                {data && (
                  <img
                    src={
                      "http://localhost/laravel8/public/upload/Blog/image/" +
                      data.image
                    }
                    alt=""
                  />
                )}
              </a>
              <div dangerouslySetInnerHTML={{ __html: data.content }} />;
              <div className="pager-area">
                <ul className="pager pull-right">
                  <li>
                    <a href="#">Pre</a>
                  </li>
                  <li>
                    <a href="#">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <RatingsBlog data={data} />
        <div className="socials-share">
          <a href="">
            <img src="images/blog/socials.png" alt="" />
          </a>
        </div>
        <CommentSection data={data} />
      </div>
    </>
  );
};
export default DetailBlog;
