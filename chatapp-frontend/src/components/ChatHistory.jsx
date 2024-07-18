import { Flex, Input } from "antd";
import "../style/chathistory.scss";
import SettingsGear from "../assets/SettingsGear";
import React, { useEffect, useState } from "react";
import SearchIcon from "../assets/SearchIcon";
import HistoryUserCard from "./HistoryUserCard";
import { getAllUser } from "../redux/slice/GetUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  authUserSelector,
  getUsersSelector,
  inviteUserSelector,
} from "../redux/selectors/selectors";
import ReceivedInvitations from "./ReceivedInvitations";
import { getInvitations } from "../redux/slice/InviteUserSlice";

const ChatHistory = ({ selectedUser, setSelectedUser }) => {
  const [search, setSearch] = useState("");
  const { allUserData } = useSelector(getUsersSelector);
  const { userData } = useSelector(authUserSelector);
  const { totalInvitations } = useSelector(inviteUserSelector);
  const currentUser = userData?.username;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getInvitations({ username: currentUser }));
  }, [dispatch, currentUser]);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const usernamesToDisplay = allUserData?.usernames || [];
  const filteredUsernames = usernamesToDisplay.filter((username) =>
    username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex className="chat-history-ctn">
      <Flex className="history-menu">
        <Flex className="history-menu-items">
          <SettingsGear />
        </Flex>
      </Flex>
      <Flex className="history-ctn">
        <Flex className="search-bar-ctn">
          <Input
            value={search}
            onChange={handleSearchInputChange}
            prefix={<SearchIcon />}
            allowClear
            placeholder="Search"
          />
        </Flex>
        <Flex className="chat-history">
          {filteredUsernames.map((u, index) => (
            <React.Fragment key={u}>
              <HistoryUserCard
                username={u}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
              {index !== filteredUsernames.length - 1 && <hr key={`hr-${u}`} />}
            </React.Fragment>
          ))}
        </Flex>
        <Flex className="received-invitations">
          <Flex className="received-text">
            <span>Received Invitations</span>
          </Flex>
          {totalInvitations.invitations &&
          totalInvitations.invitations.length > 0 ? (
            totalInvitations.invitations
              .map((invitation, index) =>
                !invitation?.accepted ? (
                  <React.Fragment key={invitation.invitation_id}>
                    <ReceivedInvitations
                      username={invitation.sender_username}
                      invite_id={invitation.invitation_id}
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                    />
                    {index !== totalInvitations.invitations.length - 1 && (
                      <hr key={`hr-${invitation.invitation_id}`} />
                    )}
                  </React.Fragment>
                ) : null
              )
              .filter((invitation) => !invitation?.accepted)
          ) : (
            <p>No invitations to display</p>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatHistory;
