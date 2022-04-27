const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

const payloadBD = [
  {
    sale_id: 1,
    date: "2022-04-27T05:16:46.000Z",
    product_id: 1,
    quantity: 5
  },
  {
    sale_id: 1,
    date: "2022-04-27T05:16:46.000Z",
    product_id: 2,
    quantity: 10
  }
]

const payloadBDSerialized = [
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

const payloadBDSerialized2 = [
  {
    date: "2022-04-27T05:16:46.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-04-27T05:16:46.000Z",
    productId: 2,
    quantity: 10
  }
]

describe('1- Teste do model getSales', () => {

  before(async () => {
    const execute = [payloadBD];
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna o banco padrão', async () => {
      const result = await salesModel.getSales();
      expect(result).to.be.eql(payloadBDSerialized);
    })
  })
})

describe('2- Teste do model createSales', () => {

  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Teste bem sucedido', () => {
    it('Retorna um número', async () => {
      const result = await salesModel.createSales();
      expect(result).to.be.a('number');
    })
  })
})

describe('3- Teste do model deleteSales', () => {

  before(async () => {
    const execute = [true];
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Teste bem sucedido', () => {
    it('Retorna apenas true', async () => {
      const result = await salesModel.deleteSales();
      expect(result).to.be.equals(true);
    })
  })
})

describe('4- Teste do model getSalesById', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = [payloadBD];
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(async () => {
      connection.execute.restore();
    })
    
    it('Retorna apenas true', async () => {
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.eql(payloadBDSerialized2);
    })
  })
  describe('Teste mal sucedido', () => {
    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(async () => {
      connection.execute.restore();
    })
    
    it('Retorna null', async () => {
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.equal(null);
    })
  })
})
