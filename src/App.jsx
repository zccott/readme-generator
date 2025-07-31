import React, { useState, useEffect } from "react";
import SectionManager from "./components/SectionManager";
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import Button from "@mui/material/Button";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [activeTab, setActiveTab] = useState("sections");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    if (activeTab === "sections") return <SectionManager />;
    if (activeTab === "editor") return <MarkdownEditor />;
    if (activeTab === "preview") return <MarkdownPreview />;
    return null;
  };

  return (
    <div className="container">
      {isMobile ? (
        <>
          <div className="mobile-header">
            <Button
              variant={activeTab === "sections" ? "contained" : "outlined"}
              onClick={() => setActiveTab("sections")}
            >
              Sections
            </Button>
            <Button
              variant={activeTab === "editor" ? "contained" : "outlined"}
              onClick={() => setActiveTab("editor")}
            >
              Editor
            </Button>
            <Button
              variant={activeTab === "preview" ? "contained" : "outlined"}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </Button>
          </div>
          {renderContent()}
        </>
      ) : (
        <div className="container">
          <SectionManager />
          <MarkdownEditor />
          <MarkdownPreview />
        </div>
      )}
    </div>
  );
}
