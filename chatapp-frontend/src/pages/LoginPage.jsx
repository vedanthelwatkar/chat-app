import { Button, Flex, Form, Input, Typography } from "antd";
import "../style/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";
import { loginUser } from "../redux/slice/AuthSlice";
import { useEffect } from "react";
import axios from "axios";

const { Text } = Typography;

const LoginPage = () => {
  const { loginData } = useSelector(authUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
    const data = axios.get("http://localhost:8000/users");
    console.log("data: ", data);
  };

  useEffect(() => {
    if (loginData?.loggedIn == 1) {
      navigate("/");
    }
  }, [navigate, dispatch, loginData]);

  return (
    <Flex className="auth-wrapper">
      <Flex className="auth-container">
        <Form onFinish={handleSubmit}>
          <Text className="auth-text">Login Account</Text>
          <Flex className="auth-inputs">
            <Form.Item
              name="em"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              name="pw"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
          </Flex>
          <Flex className="auth-signin-container">
            <Link to="/signup" className="forgot-text">
              Sign Up
            </Link>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
