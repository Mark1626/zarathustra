const { RequestHandler } = require("../lib/core");

const Handler = RequestHandler({
  meta: {
    name: "hello",
  },
  handle: (req, res) => {
    const { name = 'World' } = req.query
    return {
      status: 200,
      msg: `Hello ${name}`,
    };
  },
});

module.exports = Handler.handle;
