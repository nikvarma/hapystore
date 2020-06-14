module.exports = {
  exceptionApp: async () => {
    return (err, req, res, next) => {
      if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
      } else {
        next(err)
      }
    }
  },
  exceptionController: async (callback, req, res) => {
    try {
      if (typeof callback === "function") {
        await callback();
      } else {
        throw "Something went wrong, please try again after sometime.";
      }
    } catch (error) {
      await res.status(500).json({ status: 500, message: "Something went wrong, please try again after sometime." });
    }
  }
}