import { Flex, Form, Input } from "antd";
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
import {
  authUserSelector,
  messageSelector,
} from "../redux/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slice/AuthSlice";
import EmojiPicker from "emoji-picker-react";
import CloseIcon from "../assets/CloseIcon";
import showToast from "../components/showToast";
import {
  storeSentMessage,
  storeReceivedMessage,
} from "../redux/slice/MessageSlice";

const Chatbox = ({ selectedUser, setSelectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { loginData } = useSelector(authUserSelector);
  const { sentMessages, receivedMessages } = useSelector(messageSelector);
  console.log("sentMessages: ", sentMessages);
  console.log("receivedMessages: ", receivedMessages);
  const [username, setUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");
  const [localMessages, setLocalMessages] = useState([]);

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
  }, [localMessages, loginData, username]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      showToast("WebSocket connection not established", "error");
      return;
    }

    if (!username) {
      showToast("User logged out!", "error");
      return;
    }
    if (!receiverUsername) {
      showToast("Select user to send message first!", "error");
      return;
    }
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        message: message + selectedEmojis.map((emoji) => emoji.emoji).join(""),
        username,
        receiver: receiverUsername,
        timestamp: new Date().toISOString(),
        currentUser: username,
      };
      socket.send(JSON.stringify(messageData));
      setMessage("");
      setSelectedEmojis([]);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setSelectedEmojis([...selectedEmojis, emojiObject]);
  };

  const handleEmoji = () => {
    setEmojiOpen(!emojiOpen);
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
                  msg.username === username
                    ? "sent-wrapper"
                    : "received-wrapper"
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
          <Flex onClick={handleEmoji} className="emoji-ctn">
            {emojiOpen ? <CloseIcon /> : <EmojiIcon />}
          </Flex>
        </Flex>
        <Form onFinish={sendMessage}>
          <Form.Item>
            <Input
              placeholder="Type a message"
              controls={false}
              className="form-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={sendMessage}
            />
            <SendOutlined className="send-icon" onClick={sendMessage} />
          </Form.Item>
        </Form>
      </Flex>
      {emojiOpen && (
        <EmojiPicker onEmojiClick={handleEmojiClick} className="emoji-picker" />
      )}
    </Flex>
  );
};

export default Chatbox;
