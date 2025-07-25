import React from "react";
import SectionManager from "./components/SectionManager";
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";

export default function App() {
  return (
    <div className="container">
      <SectionManager />
      <MarkdownEditor />
      <MarkdownPreview />
    </div>
  );
}