import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

export default function MarkdownPreview() {
  const { selectedSections } = useSelector((state) => state.readme);

  return (
    <div className="preview">
      <h2 className="head">Preview</h2>
      <div className="markdown">
        <ReactMarkdown>
          {selectedSections.map((s) => s.content).join("\n\n")}
        </ReactMarkdown>
      </div>
    </div>
  );
}