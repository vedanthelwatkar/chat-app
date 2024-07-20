import "../style/header-nav.scss";
import { Col, Row, Flex } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppIcon from "../assets/AppIcon.jsx";
import LogoutIcon from "../assets/LogoutIcon.jsx";
import { logoutUser, resetState } from "../redux/slice/AuthSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors.js";

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [endpoint, setEndpoint] = useState("/giftcard");
  const { userData } = useSelector(authUserSelector);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetState());
    navigate("/");
  };

  useEffect(() => {
    setEndpoint(`/${location.pathname.split("/").pop()}`);
  }, [location]);

  return (
    <Row className="header-nav">
      {(endpoint === "/" || endpoint === "/signup") && (
        <div className="hide-header"></div>
      )}
      <Col span={4} className="menu-column-logo">
        <AppIcon />
      </Col>
      <Col span={16} className="menu-column-items">
        {userData?.username}
      </Col>
      <Col span={4} className="menu-column-logout">
        <Flex className="header-logout-wrapper" onClick={handleLogout}>
          <LogoutIcon />
        </Flex>
      </Col>
    </Row>
  );
};

export default HeaderNavigation;
