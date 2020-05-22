module.exports = (req, res) => {
  const { name } = req.query;
  const body = req.body;

  res.status(200).json({
    msg: `Hello ${name}`,
    body,
  });
};
