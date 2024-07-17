import { Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../style/history-card.scss";

const HistoryUserCard = ({ username, selectedUser, setSelectedUser }) => {
  const handleClick = () => {
    setSelectedUser(username);
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
        <Flex className="message-count">
          <span>1</span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HistoryUserCard;
