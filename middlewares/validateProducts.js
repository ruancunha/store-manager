const valName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const valQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (Number(quantity) < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

  next();
};

module.exports = {
  valName,
  valQuantity,
};
