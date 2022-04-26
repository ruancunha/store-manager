const valProductId = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  next();
};

const valQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (!quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const valQuantityArray = (req, res, next) => {
  const arr = req.body;
  if (arr.some((value) => value < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  valProductId,
  valQuantity,
  valQuantityArray,
};
