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
    // console.log("Entrou no services createSales");
    // console.log(body);
    await Promise.all(body
      .map(async (p) => salesModel.createSalesProducts(id, p.productId, p.quantity)));

    return { id, itemsSold: body };
  } catch (error) {
    return { message: error.message };
  }
};

const updateSales = async (saleId, products) => {
  try {
    await Promise.all(products
      .map(async (p) => salesModel.updateSales(p.quantity, saleId, p.productId)));

    return { saleId, itemUpdated: products };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getSales,
  getSalesById,
  createSales,
  updateSales,
};
