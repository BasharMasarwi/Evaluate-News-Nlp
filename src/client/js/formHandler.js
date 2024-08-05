import axios from "axios";
import { isValidURL } from "./validateURL";

const handleURLValidation = (value) => {
  const feedback = document.querySelector(".feedback-wrapper");

  const isValid = isValidURL(value);
  if (!isValid) {
    feedback.innerHTML =
      "<p class='feedback-error'> Enter a valid URL</p>";
    return false;
  }
  return true;
};

const setLoading = (show) => {
  const loader = document.querySelector(".loader");

  loader.style.visibility = show ? "visible" : "hidden";
};

const handleError = (show, msg) => {
  const error = document.querySelector(".error-wrapper");

  error.innerHTML = `<p>${msg}</p>`;
  error.style.display = show ? "block" : "none";
};

const renderResponse = (data) => {
  const results = document.getElementById("results");

  if (!data) {
    handleError(true, "Interal  error");
    return;
  }

  if (data?.error) {
    handleError(true, data.error);
    return;
  }

  results.innerHTML = `
    <p class="result-part">Score: <span>${data.score_tag}</span></p>
    <p class="result-part">Agreement: <span>${data.agreement}</span></p>
    <p class="result-part">Subjectivity: <span>${data.subjectivity}</span></p>
    <p class="result-part">Confidence: <span>${data.confidence}</span></p>
    <p class="result-part">Irony: <span>${data.irony}</span></p>
  `;
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const input = document.querySelector("#url-form input");
  const feedback = document.querySelector(".feedback-wrapper");
  feedback.innerHTML = "";
  handleError(false, "");

  const isValid = handleURLValidation(input.value);
  if (!isValid) {
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post("http://localhost:8000/", {
      url: input.value,
    });
    renderResponse(response.data);
    feedback.innerHTML =
      "<p class='feedback-success'>Success!!</p>";
  } catch (error) {
  } finally {
    setLoading(false);
  }
};

// Export the handleSubmit function
export { handleSubmit };
