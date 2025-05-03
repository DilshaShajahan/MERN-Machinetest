// src/pages/MainTabs.jsx
import { useState } from "react";
import Dashboard from "./Dashboard";
import FlowEditor from "../components/FlowEditor";
import "./MainTabs.css";

function MainTabs() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="main-tabs-container">
      <div className="tab-buttons">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={activeTab === "flow" ? "active" : ""}
          onClick={() => setActiveTab("flow")}
        >
          📝 Flow Editor
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "dashboard" ? <Dashboard /> : <FlowEditor />}
      </div>
    </div>
  );
}

export default MainTabs;
