import { Button, Flex, Form, Input, Typography } from "antd";
import "../style/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUserSelector } from "../redux/selectors/selectors";
import { loginUser } from "../redux/slice/AuthSlice";
import { useEffect } from "react";
import showToast from "../components/showToast";

const { Text } = Typography;

const LoginPage = () => {
  const { loginError, loginSuccess } = useSelector(authUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (loginError) {
      showToast(`Error Logging in ${loginError.response.data.msg}`, "error");
    }
    if (loginSuccess) {
      navigate("/chat");
    }
  }, [navigate, dispatch, loginSuccess, loginError]);

  return (
    <Flex className="auth-wrapper">
      <Flex className="auth-container">
        <Form onFinish={handleSubmit}>
          <Text className="auth-text">Login Account</Text>
          <Flex className="auth-inputs">
            <Form.Item
              name="un"
              rules={[
                { required: true, message: "Please input your text!" },
                { type: "text", message: "Please enter a valid text!" },
              ]}
            >
              <Input placeholder="Username" type="text" />
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
            <Button type="primary" htmlType="submit" className="auth-btn">
              Login
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
