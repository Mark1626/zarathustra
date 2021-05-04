const fetch = require("node-fetch");
const { RequestHandlerWithAuth } = require("../lib/core")

const API_KEY = process.env.API_KEY || "";
const WRITE_API_KEY = process.env.WRITE_API_KEY || "";
const API_URL = `https://api.github.com`;
const GIST_ID = process.env.GIST_ID || "";

const updateGist = async (content) => {
  let resp;
  try {
    const resp = await fetch(`${API_URL}/gists/${GIST_ID}`, {
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
    });
    resp = {
      status: 200,
      msg: `Log added`,
    };
  } catch (err) {
    console.error(err);
    resp = {
      status: 200,
      msg: `Log added`,
    };
  }
  return resp;
};

const Handler = RequestHandlerWithAuth({
  meta: {
    name: 'zarathustra'
  },
  handle: (request, response) => {
    const { entry } = request.body;
    let content;

    fetch(`${API_URL}/gists/${GIST_ID}`)
      .then((res) => res.json())
      .then(async (val) => {
        content = val.files["zarathustra.txt"].content;
        console.log("Fetch done succesfully");
        const log = `${content}\n${new Date().toISOString()}\t${entry}`;
        const { status, msg } = await updateGist(log);
        response.status(status).json({
          msg,
        });
      })
  }
})

module.exports = Handler.handle
