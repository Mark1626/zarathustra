const fetch = require("node-fetch");

const API_KEY = process.env.API_KEY;
const WRITE_API_KEY = process.env.WRITE_API_KEY;
const API_URL = `https://api.github.com`;
const GIST_ID = process.env.GIST_ID;

const updateGist = (content, response) => {
  fetch(
    `${API_URL}/gists/${GIST_ID}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "Thus Spoke Zarathustra",
        files: {
          "zarathustra.txt": {
            content,
            filename: "zarathustra.txt",
          },
        },
      }),
    },
    (res) => {
      console.log("Gist updated succesfully")
      response.status(200).json({
        msg: `Log added`,
      });
      console.error(res);
    }
  ).catch((err) => {
    res.status(500).json({
      msg: `Unexpected error occured`,
    });
    console.error(err);
  });
};

module.exports = (req, res) => {
  console.log("Started Request")
  const { auth } = req.headers;
  const { entry } = req.body;
  let content;

  if (auth === WRITE_API_KEY) {
    fetch(`${API_URL}/gists/${GIST_ID}`)
      .then((res) => res.json())
      .then((val) => {
        content = val.files["zarathustra.txt"].content;
        console.log("Fetch done succesfully")
        const log = `${content}\n${new Date().toISOString()}\t${entry}`
        updateGist(log, res);
      })
      .catch((err) => {
        res.status(500).json({
          msg: `Unexpected error occured`,
        });
        console.error(err);
      });
  } else {
    res.status(401).json({
      msg: `Unauthorized`,
    });
  }
};
