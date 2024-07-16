import { Flex } from "antd";
import "../style/home.scss";
import ChatHistory from "../components/ChatHistory";
import Chatbox from "../components/ChatBox";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loginData } = useSelector(authUserSelector);

  // useEffect(() => {
  //   if (loginData?.loggedIn != 1) {
  //     navigate("/login");
  //   }
  // }, [navigate, loginData]);

  return (
    <Flex className="home-page-wrapper">
      <Flex className="chathistory-wrapper">
        <ChatHistory />
      </Flex>
      <Flex className="chatbox-wrapper">
        <Chatbox />
      </Flex>
    </Flex>
  );
};

export default Home;
