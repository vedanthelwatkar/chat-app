import { Button, Flex, Form, Input, Typography } from "antd";
import "../style/auth.scss";
import { Link } from "react-router-dom";

const { Text } = Typography;

const LoginPage = () => {
  const handleSubmit = (values) => {
    console.log("Form Submitted: ", values);
  };

  return (
    <Flex className="auth-wrapper">
      <Flex className="auth-container">
        <Form onFinish={handleSubmit}>
          <Text className="auth-text">Login Account</Text>
          <Flex className="auth-inputs">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
          </Flex>
          <Flex className="auth-signin-container">
            <Link to="/forgot-password" className="forgot-text">
              Forgot password?
            </Link>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
