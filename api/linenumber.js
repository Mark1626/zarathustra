const http = require("http");

module.exports = (req, res) => {
  const API_URL = `https://api.github.com`;
  const API_KEY = process.env.API_KEY;
  const GIST_ID = process.env.GIST_ID;

  http
    .get(`${API_URL}/gists/${GIST_ID}`, (res) => {
      const lines = res.files["zarathustra.txt"].content.split("\n")
        .length;
      res.status(200).json({
        msg: `Hello there are ${lines} lines`,
        lines
      });
    })
    .on("error", (e) => {
      console.warn(e);
      res.status(200).json({
        msg: `Unexpected error occured`,
      });
    });
};
