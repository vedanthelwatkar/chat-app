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
import { useEffect, useState } from "react";
import { authUserSelector } from "../redux/selectors/selectors";
import { useSelector } from "react-redux";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { loginData } = useSelector(authUserSelector);
  const [username, setUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");

  useEffect(() => {
    setUsername(loginData?.username);
  }, [loginData]);

  useEffect(() => {
    setUsername(loginData?.username);
  }, [loginData]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000/ws/chat/myroom/");

    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, data]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Sending message:", {
        message,
        username,
        receiver: receiverUsername,
      });
      socket.send(
        JSON.stringify({ message, username, receiver: receiverUsername })
      );
      setMessage("");
    }
  };

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
        <Flex className="received-ctn">
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg.message}</li>
            ))}
          </ul>
        </Flex>
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendOutlined className="send-icon" onClick={sendMessage} />
      </Flex>
      <Input
        placeholder="enter username"
        value={receiverUsername}
        onChange={(e) => setReceiverUsername(e.target.value)}
      ></Input>
    </Flex>
  );
};

export default Chatbox;
