const fetch = require("node-fetch");

module.exports = (req, res) => {
  console.log(req.body)
  const API_KEY = process.env.API_KEY;
  const API_URL = `https://api.github.com`;
  const GIST_ID = process.env.GIST_ID;
  let content;

  fetch(`${API_URL}/gists/${GIST_ID}`)
    .then((res) => res.json())
    .then((val) => {
      content = val.files["zarathustra.txt"].content;
    })
    .catch((err) => {
      response.status(500).json({
        msg: `Unexpected error occured`,
      });
      console.error(err);
    });

  fetch(
    `${API_URL}/gists/${GIST_ID}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "A bot",
        files: {
          "zarathustra.txt": {
            content: "New line 3",
            filename: "zarathustra.txt",
          },
        },
      }),
    },
    (res) => {
      console.error(res);
    }
  ).catch((err) => {
    // response.status(500).json({
    //   msg: `Unexpected error occured`,
    // });
    console.error(err);
  });
};
