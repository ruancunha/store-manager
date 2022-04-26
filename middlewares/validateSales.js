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

const valProductIdArray = (req, res, next) => {
  const arr = req.body;
  // console.log('Entrou no valProductIdArray');
  // console.log(arr[0]);
  if (!arr[0].productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const valQuantityArray = (req, res, next) => {
  const arr = req.body;
  if (!arr[0].quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (arr[0].quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  valProductId,
  valQuantity,
  valProductIdArray,
  valQuantityArray,
};
