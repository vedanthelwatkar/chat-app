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
  console.log("messages: ", messages);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { loginData } = useSelector(authUserSelector);
  const [username, setUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");

  console.log("loginData?.username: ", loginData?.username);
  useEffect(() => {
    setUsername(loginData?.username);
  }, [loginData]);

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://chatappvedant.pythonanywhere.com/ws/chat/myroom/"
    );

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
      const messageData = {
        message,
        username,
        receiver: receiverUsername,
        timestamp: new Date().toISOString(),
      };
      console.log("Sending message:", messageData);
      socket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, messageData]);
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
        <ul>
          {messages
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((msg, index) => (
              <Flex
                key={index}
                className={
                  msg.username === username ? "sent-wrapper" : "received-ctn"
                }
                style={{
                  justifyContent:
                    msg.username === username ? "flex-end" : "flex-start",
                }}
              >
                <Flex
                  className={
                    msg.username === username ? "sent-ctn" : "received-ctn"
                  }
                >
                  {msg.message}{" "}
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </Flex>
              </Flex>
            ))}
        </ul>
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
