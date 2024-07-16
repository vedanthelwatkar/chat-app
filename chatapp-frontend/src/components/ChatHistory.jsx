import { Flex, Input } from "antd";
import "../style/chathistory.scss";
import SettingsGear from "../assets/SettingsGear";
import { useState } from "react";
import SearchIcon from "../assets/SearchIcon";
import HistoryUserCard from "./HistoryUserCard";

const ChatHistory = () => {
  const [search, setSearch] = useState("");

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

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
          <HistoryUserCard />
          <hr />
          <HistoryUserCard />
          <hr />
          <HistoryUserCard />
          <hr />
          <HistoryUserCard />
          <hr />
          <HistoryUserCard />
          <hr />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatHistory;
