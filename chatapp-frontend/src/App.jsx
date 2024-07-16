import { ConfigProvider, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import HeaderNavigation from "./components/HeaderNavigation";
import LoginPage from "../src/pages/LoginPage";
import ForgotPassword from "../src/pages/ForgotPassword";

const primaryButtonStyle = {
  colorPrimary: `#232A87`,
  colorPrimaryActive: `#232A87`,
  colorPrimaryHover: `#232A87`,
  paddingBlock: "12px",
  paddingInline: "16px",
  contentLineHeight: "16px",
  controlHeight: "auto",
  defaultColor: `#232a87`,
  defaultBg: `#E9EAF3`,
  defaultBorderColor: `#E9EAF3`,
  defaultHoverColor: `#232a87`,
  defaultHoverBg: `#E9EAF3`,
  defaultHoverBorderColor: `#E9EAF3`,
  contentFontSize: "12px",
  fontWeight: "500",
};
const singleInputStyle = {
  paddingBlock: "12px",
  paddingInline: "16px",
};

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Button: primaryButtonStyle,
            Input: singleInputStyle,
          },
        }}
      >
        <Layout className="layout-wrapper">
          <Header className="header-wrapper">
            <HeaderNavigation />
          </Header>
          <Content className="content-wrapper">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<LoginPage />} path="/login" />
              <Route element={<ForgotPassword />} path="/forgot-password" />
              <Route element={<Home />} path="*" />
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
};
export default App;
