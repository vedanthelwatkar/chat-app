import { Button, Flex, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../style/history-card.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authUserSelector,
  inviteUserSelector,
} from "../redux/selectors/selectors";
import { getInvitations, sendInvite } from "../redux/slice/InviteUserSlice";
import showToast from "./showToast";

const HistoryUserCard = ({ username, selectedUser, setSelectedUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const { userData } = useSelector(authUserSelector);
  const { totalInvitations } = useSelector(inviteUserSelector);
  const canChatWith = totalInvitations?.can_chat_with || [];
  const InvAccepted = totalInvitations?.invitations;
  const sender = userData.username;
  const receiverUser = username;
  const dispatch = useDispatch();

  const showModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleClick = () => {
    if (canChat) {
      setSelectedUser(username);
      showToast(`You are now chatting with ${username}`, "success");
    } else {
      showToast("Invite First to chat!", "error");
    }
  };

  const handleOk = () => {
    dispatch(sendInvite({ username: sender, receiver: receiverUser }));
    setInviteSent(true);
    dispatch(getInvitations({ username: sender }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isAccepted = InvAccepted?.some(
    (invitation) =>
      invitation.sender_username === username && invitation.accepted
  );

  const canChat = canChatWith.includes(username);

  return (
    <Flex
      className="profile-info-ctn"
      onClick={handleClick}
      style={{ cursor: canChat ? "pointer" : "not-allowed" }}
    >
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
        <Flex className="invite-btn">
          <Button
            onClick={canChat ? handleClick : showModal}
            style={{
              color: canChat ? "#6ea550" : "#cc2200",
            }}
          >
            {canChat ? "Chat" : "Invite"}
          </Button>
        </Flex>
        <Modal
          title="Invite to Chat"
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
