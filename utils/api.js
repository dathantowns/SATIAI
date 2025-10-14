export const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.satimentor.crabdance.com"
    : "http://localhost:3001";

export function getUserFeedback() {
  return fetch(`${baseUrl}/users/feedback`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkRes);
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

export function updateUserData(token, data) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkRes);
}

export function uploadAudio(formData) {
  return fetch(`${baseUrl}/audio`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  }).then(checkRes);
}

export function uploadText(formData) {
  return fetch(`${baseUrl}/text/analyze-document`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  }).then(checkRes);
}

export function sendMessage(messages) {
  // Convert frontend messages to the format backend expects
  const conversation = messages.map((msg) => ({
    role: msg.type === "sent" ? "user" : "assistant",
    content: msg.message,
  }));

  return fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ messages: conversation }),
  }).then(checkRes);
}

export const getToken = () => localStorage.getItem("jwt");
