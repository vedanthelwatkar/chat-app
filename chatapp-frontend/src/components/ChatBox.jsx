import { Flex, Input } from "antd";
import "../style/chatbox.scss";
import {
  MoreOutlined,
  PhoneOutlined,
  SendOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Microphone from "../assets/Microphone";
import Gallery from "../assets/Gallery";
import EmojiIcon from "../assets/EmojiIcon";

const Chatbox = () => {
  return (
    <Flex className="chatbox-wrapper-inner">
      <Flex className="chatbox-header">
        <Flex className="profile-info">
          <Flex className="profile-icon">
            <UserOutlined />
          </Flex>
          <Flex className="info-text-ctn">
            <Flex className="user-name">
              <span>Vedant helwatkar</span>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="contact-ctn">
          <PhoneOutlined />
          <VideoCameraOutlined />
          <MoreOutlined />
        </Flex>
      </Flex>
      <Flex className="chatbox-body">
        <Flex className="sent-wrapper">
          <Flex className="sent-ctn">how are you?</Flex>
        </Flex>
        <Flex className="received-ctn">im fine wby?</Flex>
      </Flex>
      <Flex className="chatbox-footer">
        <Flex className="interact-icons">
          <Microphone />
          <Gallery />
          <EmojiIcon />
        </Flex>
        <Input
          placeholder="Type a message"
          controls={false}
          className="form-input"
        />
        <SendOutlined className="send-icon" />
      </Flex>
    </Flex>
  );
};

export default Chatbox;
