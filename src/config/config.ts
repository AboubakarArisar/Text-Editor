const localUrl = "http://localhost:5000";
const prodUrl = "https://editor-back-e76dd6172a25.herokuapp.com";
export const API_URL =
  import.meta.env.MODE === "development" ? localUrl : prodUrl;
