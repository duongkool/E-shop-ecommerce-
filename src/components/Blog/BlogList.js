import { useEffect, useState } from "react";
import { fetchBlog } from "../../services/UserServices";
import { Link, useNavigate } from "react-router-dom";
const BlogList = () => {
  const [listBlog, setListBlog] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);
  const getBlog = async () => {
    let res = await fetchBlog();
    setListBlog(res.data.blog.data);
  };
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {listBlog &&
            listBlog.length > 0 &&
            listBlog.map((item, index) => {
              console.log(item);
              return (
                <div key={`blog-${index}`} className="single-blog-post">
                  <h3>{item.title}</h3>
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
                    <span>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star-half-o"></i>
                    </span>
                  </div>
                  <a href="">
                    <img
                      src={
                        "http://localhost/laravel8/public/upload/Blog/image/" +
                        item.image
                      }
                      alt=""
                    />
                  </a>
                  <p>{item.description}</p>
                  <Link
                    to={`/blog/detail/${item.id}`}
                    className="btn btn-primary"
                    href=""
                  >
                    Read More
                  </Link>
                </div>
              );
            })}

          <div className="pagination-area">
            <ul className="pagination">
              <li>
                <a href="" className="active">
                  1
                </a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogList;
