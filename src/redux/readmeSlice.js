import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  selectedSections: [],
  activeSectionId: null,
};

const readmeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {
    reorderSections(state, action) {
      state.sections = action.payload;
    },
    addSection: (state, action) => {
      const id = nanoid();
      state.selectedSections.push({ id, title: action.payload.title, content: action.payload.content });
      state.activeSectionId = id;
    },
    deleteSection: (state, action) => {
      state.selectedSections = state.selectedSections.filter((s) => s.id !== action.payload);
      if (state.activeSectionId === action.payload) state.activeSectionId = null;
    },
    setActiveSection: (state, action) => {
      state.activeSectionId = action.payload;
    },
    updateSectionContent: (state, action) => {
      const section = state.selectedSections.find((s) => s.id === action.payload.id);
      if (section) section.content = action.payload.content;
    },
    resetAll: () => initialState,
  },
});

export const {
  addSection,
  deleteSection,
  setActiveSection,
  updateSectionContent,
  resetAll,
  reorderSections,
} = readmeSlice.actions;

export default readmeSlice.reducer;