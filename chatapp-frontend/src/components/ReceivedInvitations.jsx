import { Button, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../style/history-card.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";
import { acceptRequest, getInvitations } from "../redux/slice/InviteUserSlice";

const ReceivedInvitations = ({ username, invite_id }) => {
  const { userData } = useSelector(authUserSelector);

  const dispatch = useDispatch();
  const [accepting, setAccepting] = useState(null);
  const currentUser = userData?.username;

  const handleAccept = () => {
    setAccepting(true);
  };

  const handleReject = () => {
    setAccepting(false);
  };

  useEffect(() => {
    if (accepting !== null) {
      dispatch(acceptRequest({ invitation_id: invite_id, accept: accepting }));
      setTimeout(() => {
        dispatch(getInvitations({ username: currentUser }));
      }, [1000]);
    }
  }, [dispatch, invite_id, accepting, currentUser]);

  return (
    <Flex
      className="profile-info-ctn"
      style={{ flexDirection: "column", height: "auto" }}
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
      <Flex className="buttons-wrapper">
        <Button className="accept-btn" onClick={handleAccept}>
          Accept
        </Button>
        <Button className="reject-btn" onClick={handleReject}>
          Reject
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReceivedInvitations;
