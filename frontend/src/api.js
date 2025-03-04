const API_BASE_URL = "https://test-env-0xqt.onrender.com";

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || "An error occurred");
  }
  return response.json();
};
