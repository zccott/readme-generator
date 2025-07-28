import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSectionContent } from "../redux/readmeSlice";

export default function MarkdownEditor() {
  const dispatch = useDispatch();
  const section = useSelector((state) =>
    state.readme.selectedSections.find((s) => s.id === state.readme.activeSectionId)
  );

  if (!section) return <div className="editor"><h2 className="head">Editor</h2><p>No section selected</p></div>;

  return (
    <div className="editor">
      <h2 className="head">Editing: {section.title ? section.title : ""}</h2>
      <textarea
        className="textarea"
        value={section.content ? section.content : ""}
        onChange={(e) => dispatch(updateSectionContent({ id: section.id, content: e.target.value }))}
      />
    </div>
  );
}