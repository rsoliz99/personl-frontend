// Get all educators from localStorage
export const getEducators = () => {
  const data = localStorage.getItem("educators");
  return data ? JSON.parse(data) : [];
};

// Save a new educator to localStorage
export const saveEducator = (educator) => {
  const current = getEducators();
  localStorage.setItem("educators", JSON.stringify([...current, educator]));
};

// Find educator by email + password (for login)
export const findEducator = (email, password) => {
  const current = getEducators();
  return current.find(
    (edu) => edu.email === email && edu.password === password
  );
};

// Find educator by certification state + ID (for district search)
export const findEducatorByStateAndId = (state, teaId) => {
  const current = getEducators();
  return current.find(
    (edu) =>
      edu.certificationState === state &&
      edu.teaId.toLowerCase() === teaId.toLowerCase()
  );
};
