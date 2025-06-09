// Load all file requests from localStorage
export const getFileRequests = () => {
  const data = localStorage.getItem("fileRequests");
  return data ? JSON.parse(data) : [];
};

// Save a new file request to localStorage
export const saveFileRequest = (request) => {
  const current = getFileRequests();
  localStorage.setItem("fileRequests", JSON.stringify([...current, request]));
};

// Update the status of a specific request (by timestamp)
export const updateRequestStatus = (timestamp, newStatus) => {
  const current = getFileRequests();
  const updated = current.map((req) =>
    req.requestedAt === timestamp ? { ...req, status: newStatus } : req
  );
  localStorage.setItem("fileRequests", JSON.stringify(updated));
};

// Get requests sent TO an educator (initiated by districts)
export const getRequestsToEducator = (teaId, certificationState) => {
  const current = getFileRequests();
  return current.filter(
    (req) =>
      req.initiatedBy === "district" &&
      req.educatorTeaId.toLowerCase() === teaId.toLowerCase() &&
      req.educatorState === certificationState
  );
};

// Get requests sent BY an educator (to former districts)
export const getRequestsFromEducator = (teaId, certificationState) => {
  const current = getFileRequests();
  return current.filter(
    (req) =>
      req.initiatedBy === "educator" &&
      req.educatorTeaId.toLowerCase() === teaId.toLowerCase() &&
      req.educatorState === certificationState
  );
};
export function uploadFileForRequest(timestamp, fileName) {
  const data = JSON.parse(localStorage.getItem("fileRequests")) || [];
  const updated = data.map((req) =>
    req.requestedAt === timestamp
      ? { ...req, status: "Files Uploaded", uploadedFile: fileName }
      : req
  );
  localStorage.setItem("fileRequests", JSON.stringify(updated));
}
