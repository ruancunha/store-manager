const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');
const productsModel = require('../../../models/productsModel');

const payloadBD = [
  {
    saleId: 1,
    date: "2022-04-27T05:16:46.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-04-27T05:16:46.000Z",
    productId: 2,
    quantity: 10
  }
]

const payloadProduct = {
  id: 4,
  name: 'Arco do Gavião',
  quantity: 10
}

describe('1- Teste do service getSalesById', () => {

  before(async () => {
    const execute = payloadBD;
    sinon.stub(salesModel, 'getSalesById').resolves(execute);
  })

  after(async () => {
    salesModel.getSalesById.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna um array', async () => {
      const result = await salesServices.getSalesById(1);
      expect(result).to.be.eql(payloadBD);
    })
  })
})

describe('2- Teste do service checkQuantity', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = payloadProduct;
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    })
  
    after(async () => {
      productsModel.getProductById.restore();
    })

    it('retorna um array', async () => {
      const result = await salesServices.checkQuantity([{ productId: 4, quantity: 2 }]);
      expect(result).to.be.equals(false);
    })
  })

  describe('Teste mal sucedido', () => {
    before(async () => {
      const execute = payloadProduct;
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    })
  
    after(async () => {
      productsModel.getProductById.restore();
    })
    
    it('retorna um array', async () => {
      const result = await salesServices.checkQuantity([{ productId: 4, quantity: 200 }]);
      expect(result).to.be.equals(true);
    })
  })
})

describe('3- Teste do service deleteSales', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = true;
      sinon.stub(salesModel, 'getSalesById').resolves(execute);
      sinon.stub(salesModel, 'deleteSales').resolves(true);
    })
  
    after(async () => {
      salesModel.getSalesById.restore();
      salesModel.deleteSales.restore();
    })

    it('retorna true', async () => {
      const result = await salesServices.deleteSales(1);
      expect(result).to.be.equals(true);
    })
  })

  describe('Teste mal sucedido', () => {
    before(async () => {
      const execute = null;
      sinon.stub(salesModel, 'getSalesById').resolves(execute);
    })
  
    after(async () => {
      salesModel.getSalesById.restore();
    })
    
    it('retorna um objeto com uma message', async () => {
      const result = await salesServices.deleteSales(1);
      expect(result).to.be.eql({ message: 'Sale not found' });
    })
  })
})
