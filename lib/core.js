const { compose } = require("./utils");

const AccessLogger = (params) => {
  const { meta, handle } = params;

  return {
    ...params,
    handle(...params) {
      console.log(`Handling req for fn ${meta.name}`);
      handle(...params);
    },
  };
};

const ErrorHandler = (params) => {
  const { handle } = params;

  return {
    ...params,
    handle(...params) {
      const { res } = params;
      try {
        console.log("Try");
        handle(...params);
      } catch (err) {
        console.log("Error", err);
        res.status(500).json({
          msg: "Internal Server Error",
        });
      }
    },
  };
};

const ResponseFormatter = (params) => {
  const { handle } = params;

  return {
    ...params,
    handle(...params) {
      const { res } = params;
      const resp = handle(...params);
      const { status, msg } = resp;
      res.status(status).send({ msg });
    },
  };
};

const RequestHandler = compose(AccessLogger, ErrorHandler, ResponseFormatter);

module.exports = {
  RequestHandler,
};
