export const validateBasePath = (req, res, next) => {
  const { base_path } = req.params;
  const userBasePath = req.user.basePath;

  if (base_path !== userBasePath) {
    return res.status(403).json({
      message: 'You do not have permission to access this base path',
    });
  }

  next();
};
