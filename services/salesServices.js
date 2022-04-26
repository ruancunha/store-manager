const salesModel = require('../models/salesModel');

const getSales = async () => {
  const sales = await salesModel.getSales();

  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);

  return sales;
};

const createSales = async (body) => {
  try {
    const id = await salesModel.createSales();
    await Promise.all(body
      .map(async (p) => salesModel.createSalesProducts(id, p.productId, p.quantity)));

    return { id, itemsSold: body };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getSales,
  getSalesById,
  createSales,
};
