import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateSectionContent,
  setActiveSection,
  addSection,
} from "../redux/readmeSlice";
import templates from "../utils/sectionTemplates";

export default function MarkdownEditor() {
  const dispatch = useDispatch();

  const { selectedSections, activeSectionId, availableSectionTitles } =
    useSelector((state) => state.readme);

  const section = selectedSections.find((s) => s.id === activeSectionId);

  useEffect(() => {
    if (selectedSections.length === 1) {
      dispatch(setActiveSection(selectedSections[0].id));
    } else if (selectedSections.length === 0) {
      const title = availableSectionTitles.find((t) => t === "Project Title");
      dispatch(
        addSection({ title, content: templates[title] || `## ${title}\n\n` })
      );
    }
  }, [activeSectionId, selectedSections, availableSectionTitles, dispatch]);

  if (!section) {
    return (
      <div className="editor">
        <h2 className="head">Editor</h2>
        <p>No section selected</p>
      </div>
    );
  }

  return (
    <div className="editor">
      <h2 className="head">Editing - {section.title || ""}</h2>
      <textarea
        className="textarea"
        value={section.content || ""}
        onChange={(e) =>
          dispatch(
            updateSectionContent({ id: section.id, content: e.target.value })
          )
        }
      />
    </div>
  );
}
