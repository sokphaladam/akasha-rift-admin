import React, { PropsWithChildren } from "react";
import "./App.scss";
import { Sidebar } from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Topbar } from "./components/Topbar";
import { auth } from "./service/firebase";
import { LoginPage } from "./page/LoginPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { SettingPage } from "./page/SettingPage";

function AppLayout(props: PropsWithChildren<{}>) {
  return (
    <div className="App">
      <Sidebar />
      <div className="layout">
        <Topbar />
        <div className="page">{props.children}</div>
      </div>
    </div>
  );
}

function Blank() {
  return <div>This is Blank page</div>;
}

function VerifyAuth() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div></div>;

  if (!loading && !user) {
    return <LoginPage />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Blank />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <VerifyAuth />
    </BrowserRouter>
  );
}

export default App;
