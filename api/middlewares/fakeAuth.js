export default (req, res, next) => {
  // mock user object
  req.user = {
    id: 1, // or any valid test user id from your DB
  };
  next();
};