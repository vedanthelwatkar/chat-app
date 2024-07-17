import { Flex } from "antd";
import "../style/home.scss";
import ChatHistory from "../components/ChatHistory";
import Chatbox from "../components/ChatBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";
import { useNavigate } from "react-router-dom";
import { getUser } from "../redux/slice/AuthSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(authUserSelector);
  console.log("userData: ", userData);

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
