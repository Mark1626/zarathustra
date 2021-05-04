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
      const [req, res] = params;
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
      const [req, res] = params;
      const resp = handle(...params);
      const { status, msg } = resp;
      res.status(status).send({ msg });
    },
  };
};

const AuthHandler = (params) => {
  const { handle } = params;

  return {
    ...params,
    handle(...params) {
      const [req, res] = params;
      const { auth } = req.headers;
      if (auth === WRITE_API_KEY) {
        handle(...params)
      } else {
        res.status(401).json({
          msg: `Unauthorized`,
        });
      }
    }
  }
}

const RequestHandler = compose(AccessLogger, ErrorHandler, ResponseFormatter);

const RequestHandlerWithAuth = compose(AccessLogger, ErrorHandler, AuthHandler, ResponseFormatter)

module.exports = {
  RequestHandler,
  RequestHandlerWithAuth,
};
