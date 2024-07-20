import { Button, Flex, Form, Input, Typography } from "antd";
import "../style/auth.scss";
import { authUserSelector } from "../redux/selectors/selectors";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, resetSignupError } from "../redux/slice/AuthSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import showToast from "../components/showToast";

const { Text } = Typography;

const LoginPage = () => {
  const { signUpError, signUpSuccess } = useSelector(authUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(signupUser(values));
  };

  useEffect(() => {
    if (signUpError) {
      showToast(
        `Error Logging in ${signUpError?.response?.data?.msg}`,
        "error"
      );
    }
    if (signUpSuccess) {
      navigate("/chat");
      dispatch(resetSignupError());
    }
  }, [navigate, dispatch, signUpSuccess, signUpError]);

  return (
    <Flex className="auth-wrapper">
      <Flex className="auth-container">
        <Form onFinish={handleSubmit}>
          <Text className="auth-text">Signup</Text>
          <Flex className="auth-inputs">
            <Form.Item
              name="un"
              rules={[
                { required: true, message: "Please input your username!" },
                { type: "text", message: "Please enter a valid username!" },
              ]}
            >
              <Input placeholder="Username" type="text" />
            </Form.Item>
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
              name="pw1"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="pw2"
              dependencies={["pw1"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("pw1") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Confirm Password" />
            </Form.Item>
          </Flex>
          <Flex className="auth-signin-container">
            <Link to="/login" className="forgot-text">
              Login
            </Link>
            <Button type="primary" htmlType="submit" className="auth-btn">
              Sign Up
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
