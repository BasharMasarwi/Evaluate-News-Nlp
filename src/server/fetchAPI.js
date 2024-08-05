const axios = require("axios");

const BASE_URL = "https://api.meaningcloud.com/sentiment-2.1";

const analyzeURL = async (url, key) => {
  let responseBody = {};
  await axios
    .get(`${BASE_URL}?key=${key}&url=${url}&lang=en`)
    .then((response) => {
      const { data } = response;
      const { code } = data.status;
      if (code != 0) {
        if (code == 100) {
          responseBody = {
            error: `${data.status.msg}, API key or provided URL is invalid`,
          };
        } else {
          responseBody = { error: data.status.msg };
        }
      } else {
        responseBody = {
          score_tag: data.score_tag,
          agreement: data.agreement,
          subjectivity: data.subjectivity,
          confidence: data.confidence,
          irony: data.irony,
        };
      }
      return responseBody;
    })
    .catch((error) => {
      console.log(error);
      responseBody = { error: "MeaningCloud server error" };
      return responseBody;
    });

  return responseBody;
};

module.exports = { analyzeURL };
