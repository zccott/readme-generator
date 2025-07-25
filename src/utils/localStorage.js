export const loadState = () => {
  try {
    const serialized = localStorage.getItem("readmeState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("readmeState", JSON.stringify(state));
  } catch {
    // Ignore write errors
  }
};