import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import AutoAwesomeSharpIcon from "@mui/icons-material/AutoAwesomeSharp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function MarkdownPreview() {
  const { selectedSections } = useSelector((state) => state.readme);
  const [apiKey, setApiKey] = useState("");

  const handleOptimizeClick = async () => {
    // if (!apiKey) {}
  };

  return (
    <div className="preview">
      <div className="preview-header">
        <div className="preview-title">
          <h2 className="head">Preview</h2>
          <Tooltip title="Optimize with Gemini">
            <IconButton onClick={handleOptimizeClick} disabled={!apiKey} color="primary">
              <AutoAwesomeSharpIcon />
            </IconButton>
          </Tooltip>
        </div>
        <TextField
          id="outlined-basic"
          label="Gemini API"
          variant="outlined"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      <div className="markdown">
        <ReactMarkdown>
          {selectedSections.map((s) => s.content).join("\n\n")}
        </ReactMarkdown>
      </div>
    </div>
  );
}
