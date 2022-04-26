const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const checkQuantity = async ([{ productId, quantity }]) => {
  const product = await productsModel.getProductById(productId);
  if (product.quantity < quantity) return true;
  return false;
};

const getSales = async () => {
  try {
    const sales = await salesModel.getSales();
    return sales;
  } catch (error) {
    return { message: error.message };
  }
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);

  return sales;
};

const createSales = async (body) => {
  try {
    const check = await checkQuantity(body);
    if (check) return { status: 422, message: 'Such amount is not permitted to sell' };
    const id = await salesModel.createSales();
    await Promise.all(body
      .map(async (p) => salesModel.createSalesProducts(id, p.productId, p.quantity)));

    return { id, itemsSold: body };
  } catch (error) {
    console.log(error);
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

const deleteSales = async (id) => {
  try {
    const checkId = await salesModel.getSalesById(id);
    if (checkId === null) {
      return { message: 'Sale not found' };
    }
    await salesModel.deleteSales(id);
    return true;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getSales,
  getSalesById,
  createSales,
  updateSales,
  deleteSales,
};
