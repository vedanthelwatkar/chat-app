import { Button, Drawer, Flex } from "antd";
import "../style/home.scss";
import ChatHistory from "../components/ChatHistory";
import Chatbox from "../components/ChatBox";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MenuOutlined } from "@ant-design/icons";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Flex className="home-page-wrapper">
      {isMobile && (
        <Button
          className="menu-icon"
          type="primary"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />
      )}
      {isMobile ? (
        <Drawer
          title="Invite & Chat"
          placement="left"
          closable={true}
          onClose={closeDrawer}
          visible={drawerVisible}
          width={300}
        >
          <ChatHistory
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </Drawer>
      ) : (
        <Flex className="chathistory-wrapper">
          <ChatHistory
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </Flex>
      )}
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
