import { useNavigate } from "react-router-dom";

const MenuAcc = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordian"
                    onClick={() => navigate("/account/update")}
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    Account
                  </a>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordian"
                    onClick={() => navigate("/account/myproduct")}
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    My product
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuAcc;
