import React, { PropsWithChildren } from "react";
import "./App.scss";
import { Sidebar } from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Topbar } from "./components/Topbar";
import { auth } from "./service/firebase";
import { LoginPage } from "./page/LoginPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { SettingPage } from "./page/SettingPage";
import { LogoPage } from "./page/LogoPage";
import { DialogComponent } from "./components/DialogComponent";
import { Modal } from "./hook/modal";
import { StoryPage } from "./page/StoryPage";
import { ContentBlock as ContentBlockC } from "./page/character/ContentBlock";
import { ContentBlock as ContentBlockF } from "./page/faq/ContentBlock";
import { JoinTeamPage } from "./page/JoinTeamPage";
import { ContentBlock as ContentBlockT } from "./page/team/ContenBlock";
import { ContentBlock as ContentBlockR } from "./page/roadmap/ContenBlock";

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
      <DialogComponent ref={(t) => Modal.setModal(t)} />
      <Routes>
        <Route path="/" element={<Blank />} />
        <Route path="/block/logo" element={<LogoPage />} />
        <Route path="/block/story" element={<StoryPage />} />
        <Route path="/block/_bcharacter" element={<ContentBlockC />} />
        <Route path="/block/_broadmap" element={<ContentBlockR />} />
        <Route path="/block/_bteam" element={<ContentBlockT />} />
        <Route path="/block/_bfaq" element={<ContentBlockF />} />
        <Route path="/block/join_team" element={<JoinTeamPage />} />
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
