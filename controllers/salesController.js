const salesServices = require('../services/salesServices');

const getSales = async (_req, res) => {
  const sales = await salesServices.getSales();

  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesServices.getSalesById(id);

  if (!sales) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sales);
};

const createSales = async (req, res) => {
  const { body } = req;
  const createdSale = await salesServices.createSales(body);

  if (createdSale.message) return res.status(400).json(createdSale);

  return res.status(201).json(createdSale);
};

const updateSales = async (req, res) => {
  const { body: products } = req;
  const { id: saleId } = req.params;
  const updatedSale = await salesServices.updateSales(saleId, products);

  if (updatedSale.message) return res.status(400).json(updatedSale);

  return res.status(200).json(updatedSale);
};

module.exports = {
  getSales,
  getSalesById,
  createSales,
  updateSales,
};
