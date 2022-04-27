const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

const payloadBD = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 10
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
    quantity: 10
  }
]

const payloadProduct = [{
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  }]

const payloadBDNew = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 10
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
    quantity: 10
  },
  {
    id: 4,
    name: 'Arco do Gavião',
    quantity: 10
  }
]

const payloadProductNew = [{
  id: 4,
  name: 'Arco do Gavião',
  quantity: 10
}]

describe('1- Teste do model getProducts', () => {

  before(async () => {
    const execute = payloadBD;
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna um array', async () => {
      const result = await productsModel.getProducts();
      expect(result).to.be.a('object');
    })
  })
})

describe('2- Teste do model getProductById', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = [payloadProduct];
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(async () => {
      connection.execute.restore();
    })
    it('retorna um object', async () => {
      const result = await productsModel.getProductById(1);
      expect(result).to.be.a('object');
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
    
    it('Retorna apenas true', async () => {
      const result = await productsModel.getProductById(1);
      expect(result).to.be.equal(null);
    })
  })
})

describe('3- Teste do model createProduct', () => {

  before(async () => {
    const execute = [payloadProductNew];
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna um objeto', async () => {
      const result = await productsModel.createProduct('Arco do Gavião', 10);
      expect(result).to.be.a('object');
    })
  })
})

describe('4- Teste do model deleteProduct', () => {

  before(async () => {
    const execute = true;
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna true', async () => {
      const result = await productsModel.deleteProduct(1);
      expect(result).to.be.equals(true);
    })
  })
})
