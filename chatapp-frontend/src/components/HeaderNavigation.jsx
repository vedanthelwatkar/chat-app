import "../style/header-nav.scss";
import { Typography, Col, Row, Flex } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppIcon from "../assets/AppIcon.jsx";
import LogoutIcon from "../assets/LogoutIcon.jsx";
const { Text } = Typography;

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [endpoint, setEndpoint] = useState("/giftcard");

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    setEndpoint(`/${location.pathname.split("/").pop()}`);
  }, [location]);

  return (
    <Row className="header-nav">
      {(endpoint === "/login" || endpoint === "/forgot-password") && (
        <div className="hide-header"></div>
      )}
      <Col span={4} className="menu-column-logo">
        <AppIcon />
      </Col>
      <Col span={16} className="menu-column-items">
        Chat App
      </Col>
      <Col span={4} className="menu-column-logout">
        <Flex className="header-logout-wrapper" onClick={handleLogout}>
          <LogoutIcon />
          <Text className="logout-text">Logout</Text>
        </Flex>
      </Col>
    </Row>
  );
};

export default HeaderNavigation;
