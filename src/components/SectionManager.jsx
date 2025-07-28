import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSection,
  deleteSection,
  setActiveSection,
  resetAll,
} from "../redux/readmeSlice";
import templates from "../utils/sectionTemplates";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";

export default function SectionManager() {
  const dispatch = useDispatch();
  const { selectedSections, activeSectionId } = useSelector(
    (state) => state.readme
  );

  const handleAdd = (title) => {
    if (!selectedSections.find((s) => s.title === title)) {
      dispatch(
        addSection({ title, content: templates[title] || `## ${title}\n\n` })
      );
    }
  };

  const handleReset = () => dispatch(resetAll());

  return (
    <div className="sidebar">
      <h2 className="head">
        Sections
        <IconButton onClick={handleReset}>
          <RefreshIcon />
        </IconButton>
      </h2>
      {selectedSections.map((s) => (
        <div
          key={s.id}
          className={`section-btn ${s.id === activeSectionId ? "active" : ""}`}
        >
          <span onClick={() => dispatch(setActiveSection(s.id))}>
            {s.title}
          </span>
          <IconButton
            onClick={() => dispatch(deleteSection(s.id))}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      <hr />
      <h3 className="head">Add Section</h3>
      {Object.keys(templates).map((title) => (
        <Button key={title} onClick={() => handleAdd(title)} variant="text">
          {title}
        </Button>
      ))}
    </div>
  );
}
