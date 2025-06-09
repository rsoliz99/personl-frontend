// utils/auth.js

export function parseSafeJSON(data, fallback) {
  try {
    const parsed = JSON.parse(data);
    return parsed ?? fallback; // Use fallback if parsed is null or undefined
  } catch {
    return fallback;
  }
}


export function getLocalEducator() {
  const saved = localStorage.getItem("educatorUser");
  return parseSafeJSON(saved, {
    name: "",
    email: "",
    certificate: "",
    lastDistrict: {
      name: "",
      state: "",
    },
  });
}
