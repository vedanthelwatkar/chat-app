import { Flex, Input } from "antd";
import "../style/chathistory.scss";
import SettingsGear from "../assets/SettingsGear";
import React, { useEffect, useState } from "react";
import SearchIcon from "../assets/SearchIcon";
import HistoryUserCard from "./HistoryUserCard";
import { getAllUser } from "../redux/slice/GetUsers";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSelector } from "../redux/selectors/selectors";

const ChatHistory = ({ selectedUser, setSelectedUser }) => {
  const [search, setSearch] = useState("");
  const { allUserData } = useSelector(getUsersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter usernames based on search input
  const filteredUsernames = allUserData?.usernames.filter((username) =>
    username.toLowerCase().includes(search.toLowerCase())
  );

  // Determine which usernames to display
  const usernamesToDisplay = search
    ? filteredUsernames
    : allUserData?.usernames || [];

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
          {usernamesToDisplay.map((u, index) => (
            <React.Fragment key={u}>
              <HistoryUserCard
                username={u}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
              {index !== usernamesToDisplay.length - 1 && (
                <hr key={`hr-${u}`} />
              )}
            </React.Fragment>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatHistory;
