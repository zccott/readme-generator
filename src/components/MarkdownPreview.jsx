import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import AutoAwesomeSharpIcon from "@mui/icons-material/AutoAwesomeSharp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { GoogleGenAI, Type } from "@google/genai";
import { updateSectionContent } from "../redux/readmeSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MarkdownPreview() {
  const { selectedSections } = useSelector((state) => state.readme);
  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [vertical] = useState("top");
  const [horizontal] = useState("center");

  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const handleOptimizeClick = async () => {
    if (!apiKey || selectedSections.length === 0) return;

    const genAI = new GoogleGenAI({ apiKey });
    setLoading(true);

    try {
      const prompt = `
You are a helpful AI assistant. You will receive a list of README sections in JSON format.

Each section has:
- id (do not change),
- title (do not change),
- content (ONLY this should be improved).

Your task:
- Improve ONLY the "content" of each section.
- Keep all other fields (id, title) unchanged.
- Do NOT reorder the sections.
- Keep Markdown formatting correct and clean.
- Return ONLY the updated JSON with improved "content".

Here is the input:
${JSON.stringify(selectedSections, null, 2)}
`;

      const result = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleaned = rawText.replace(/(^```json\s*|^\s*```$)/gm, "").trim();
      const optimizedSections = JSON.parse(cleaned);
      optimizedSections.forEach((s) => {
        dispatch(updateSectionContent({ id: s.id, content: s.content }));
      });
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || error?.toString() || "Unknown error";
      if (errorMessage.includes("API key not valid")) {
        setSnackMsg("Invalid API key. Please check your Google GenAI API key.");
      } else {
        setSnackMsg("Something went wrong. Please try again.");
      }
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="preview">
      <div className="preview-header">
        <div className="preview-title">
          <h2 className="head">Preview</h2>
          <Tooltip title="Optimize with Gemini">
            <IconButton
              loading={loading}
              onClick={handleOptimizeClick}
              disabled={!apiKey || loading}
              color="primary"
            >
              <AutoAwesomeSharpIcon />
            </IconButton>
          </Tooltip>
        </div>
        <TextField
          label="Gemini API"
          variant="outlined"
          size="small"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      <div className="markdown">
        <ReactMarkdown>
          {selectedSections.map((s) => s.content).join("\n\n")}
        </ReactMarkdown>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackOpen}
        onClose={handleSnackClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
