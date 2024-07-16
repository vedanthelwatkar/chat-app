import { Flex } from "antd";
import "../style/home.scss";
import ChatHistory from "../components/ChatHistory";
import Chatbox from "../components/ChatBox";

const Home = () => {
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
