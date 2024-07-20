import { Button, Flex, Form, Input, Typography } from "antd";
import "../style/auth.scss";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleResetPassword = (values) => {
    console.log("Reset Password with: ", values);
  };

  return (
    <Flex className="auth-wrapper">
      <Flex className="auth-container">
        <Text className="auth-text">Forgotten Password</Text>
        <Form onFinish={handleResetPassword}>
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
          </Flex>
          <Flex className="login-reset-container">
            <Button type="default" onClick={() => navigate("/")}>
              Login
            </Button>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
