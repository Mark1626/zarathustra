const fetch = require("node-fetch");

module.exports = (request, response) => {
  const API_URL = `http://api.github.com`;
  const GIST_ID = process.env.GIST_ID;

  fetch(`${API_URL}/gists/${GIST_ID}`)
    .then((res) => res.json())
    .then((val) => {
      const lines = val.files["zarathustra.txt"].content.split("\n").length;
      response.status(200).json({
        msg: `Hello there are ${lines} lines`,
        lines,
      });
    }).catch(err => {
      response.status(500).json({
        msg: `Unexpected error occured`
      });
      console.error(err)
    });
};
