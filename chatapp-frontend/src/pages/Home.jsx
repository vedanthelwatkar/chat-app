import { Button, Drawer, Flex } from "antd";
import "../style/home.scss";
import ChatHistory from "../components/ChatHistory";
import Chatbox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MenuOutlined } from "@ant-design/icons";
import { getAllUser } from "../redux/slice/GetUsers";
import { getInvitations } from "../redux/slice/InviteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { userData } = useSelector(authUserSelector);
  const currentUser = userData?.username;

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const handleItemClick = () => {
    closeDrawer();
  };

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getInvitations({ username: currentUser }));
  }, [dispatch, currentUser]);
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
          open={drawerVisible}
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
