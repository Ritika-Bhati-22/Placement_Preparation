import React, { useState } from "react";
import BgLayer from "./components/layout/BgLayer";
import Nav from "./components/layout/Nav";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Resume from "./components/pages/Resume";
import ATS from "./components/pages/ATS";
import InterviewPrep from "./components/pages/InterviewPrep";
import DSA from "./components/pages/DSA";
import Performance from "./components/pages/Performance";
import Chatbot from "./components/pages/Chatbot";

const App: React.FC = () => {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":   return <Dashboard onNav={setPage} />;
      case "resume":      return <Resume />;
      case "ats":         return <ATS />;
      case "prep":        return <InterviewPrep />;
      case "dsa":         return <DSA />;
      case "performance": return <Performance />;
      case "chatbot":     return <Chatbot />;
      default:            return <Dashboard onNav={setPage} />;
    }
  };

  return (
    <>
      <BgLayer />
      <Nav active={page} onNav={setPage} />
      <div style={{
        display: "flex",
        minHeight: "100vh",
        paddingTop: 60,
        position: "relative",
        zIndex: 1,
      }}>
        <Sidebar active={page} onNav={setPage} />
        <main style={{
          flex: 1,
          padding: "28px 32px",
          overflowY: "auto",
          minWidth: 0,
        }}>
          {renderPage()}
        </main>
      </div>
    </>
  );
};

export default App;