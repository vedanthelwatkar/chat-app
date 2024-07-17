import { Flex } from "antd";
import "../style/home.scss";
import ChatHistory from "../components/ChatHistory";
import Chatbox from "../components/ChatBox";
import { useState } from "react";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <Flex className="home-page-wrapper">
      <Flex className="chathistory-wrapper">
        <ChatHistory
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Flex>
      <Flex className="chatbox-wrapper">
        <Chatbox
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Flex>
    </Flex>
  );
};

export default Home;
