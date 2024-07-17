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
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slice/AuthSlice";

const Chatbox = ({ selectedUser, setSelectedUser }) => {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { loginData } = useSelector(authUserSelector);
  const [username, setUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");

  useEffect(() => {
    if (loginData?.username) {
      setUsername(loginData.username);
      setReceiverUsername(selectedUser);
      dispatch(getUser({ username: loginData.username }));
    }
  }, [dispatch, loginData, selectedUser]);

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://chat-app-9bk5.onrender.com/ws/chat/"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messageWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
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

      socket.send(JSON.stringify(messageData));
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
              <span>{selectedUser}</span>
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
                  paddingBottom: "12px",
                }}
              >
                <Flex
                  className={
                    msg.username === username ? "sent-ctn" : "received-ctn"
                  }
                >
                  {msg.message}{" "}
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
    </Flex>
  );
};

export default Chatbox;
