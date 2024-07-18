import { Button, Flex, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../style/history-card.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";
import { sendInvite } from "../redux/slice/InviteUserSlice";

const HistoryUserCard = ({
  username,
  selectedUser,
  setSelectedUser,
  accepted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useSelector(authUserSelector);
  const sender = userData.username;
  const receiverUser = username;
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    setSelectedUser(username);
  };

  const handleOk = () => {
    dispatch(sendInvite({ username: sender, receiver: receiverUser }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex className="profile-info-ctn" onClick={handleClick}>
      <Flex className="profile-info">
        <Flex className="profile-icon">
          <UserOutlined />
        </Flex>
        <Flex className="info-text-ctn">
          <Flex className="user-name">
            <span>{username}</span>
          </Flex>
          <Flex className="user-text">
            <span>Are you free tonight?</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="time-message">
        <Flex className="time-ctn">
          <span>4:42</span>
        </Flex>
        <Flex className="invite-btn">
          <Button onClick={showModal}>Invite</Button>
        </Flex>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Do you want to invite {username} for a chat?</p>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default HistoryUserCard;
