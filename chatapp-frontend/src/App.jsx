import { ConfigProvider, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import HeaderNavigation from "./components/HeaderNavigation";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import ForgotPassword from "../src/pages/ForgotPassword";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import AuthGuard from "./components/AuthGuard.jsx";

const primaryButtonStyle = {
  colorPrimary: `#1677ff`,
  colorPrimaryActive: `#232A87`,
  colorPrimaryHover: `#1677ff`,
  paddingBlock: "12px",
  paddingInline: "16px",
  contentLineHeight: "16px",
  controlHeight: "auto",
  defaultColor: `#232a87`,
  defaultBg: `#E9EAF3`,
  defaultBorderColor: ``,
  defaultHoverColor: ``,
  defaultHoverBg: ``,
  defaultHoverBorderColor: ``,
  contentFontSize: "12px",
  fontWeight: "500",
};
const singleInputStyle = {
  paddingBlock: "12px",
  paddingInline: "16px",
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              <AuthGuard>
                <Header className="header-wrapper">
                  <HeaderNavigation />
                </Header>
              </AuthGuard>
              <Content className="content-wrapper">
                <Routes>
                  <Route
                    element={
                      <AuthGuard>
                        <Home />
                      </AuthGuard>
                    }
                    path="/chat"
                  />
                  <Route element={<LoginPage />} path="/" />
                  <Route element={<SignupPage />} path="/signup" />
                  <Route element={<ForgotPassword />} path="/forgot-password" />
                  <Route element={<Home />} path="*" />
                </Routes>
              </Content>
            </Layout>
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
export default App;
