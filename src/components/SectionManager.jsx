import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSection,
  deleteSection,
  setActiveSection,
  reorderSections,
  resetAll,
} from "../redux/readmeSlice";
import templates from "../utils/sectionTemplates";

export default function SectionManager() {
  const dispatch = useDispatch();
  const { selectedSections, activeSectionId } = useSelector((state) => state.readme);

  const handleAdd = (title) => {
    if (!selectedSections.find((s) => s.title === title)) {
      dispatch(addSection({ title, content: templates[title] || `## ${title}\n\n` }));
    }
  };

  const handleReset = () => dispatch(resetAll());

  return (
    <div className="sidebar">
      <h2>Sections <button onClick={handleReset}>Reset</button></h2>
      {selectedSections.map((s) => (
        <div
          key={s.id}
          className={`section-btn ${s.id === activeSectionId ? "active" : ""}`}
        >
          <span onClick={() => dispatch(setActiveSection(s.id))}>{s.title}</span>
          <button onClick={() => dispatch(deleteSection(s.id))}>🗑️</button>
        </div>
      ))}

      <hr />
      <h3>Add Section</h3>
      {Object.keys(templates).map((title) => (
        <button key={title} onClick={() => handleAdd(title)}>{title}</button>
      ))}
    </div>
  );
}