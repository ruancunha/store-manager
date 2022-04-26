const salesModel = require('../models/salesModel');

const getSales = async () => {
  const sales = await salesModel.getSales();

  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);

  return sales;
};

module.exports = {
  getSales,
  getSalesById,
};
