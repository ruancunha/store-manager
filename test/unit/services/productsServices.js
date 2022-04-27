const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModel');

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

describe('1- Teste do service getProducts', () => {

  before(async () => {
    const execute = [payloadBD];
    sinon.stub(productsModel, 'getProducts').resolves(execute);
  })

  after(async () => {
    productsModel.getProducts.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna um array', async () => {
      const result = await productsServices.getProducts();
      expect(result).to.be.a('array');
    })
  })
})

describe('2- Teste do service getProductByName', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = { anything: "really" };
      sinon.stub(productsModel, 'getProductByName').resolves(execute);
    })
  
    after(async () => {
      productsModel.getProductByName.restore();
    })
    it('retorna um array', async () => {
      const result = await productsServices.getProductByName();
      expect(result).to.be.equals(true);
    })
  })

  describe('Teste mal sucedido', () => {
    before(async () => {
      const execute = false;
      sinon.stub(productsModel, 'getProductByName').resolves(execute);
    })
  
    after(async () => {
      productsModel.getProductByName.restore();
    })
    it('retorna um array', async () => {
      const result = await productsServices.getProductByName();
      expect(result).to.be.equals(false);
    })
  })
})

describe('3- Teste do service deleteProduct', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = { anything: "really" };
      sinon.stub(productsModel, 'getProductById').resolves(execute);
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
    })
  
    after(async () => {
      productsModel.getProductById.restore();
      productsModel.deleteProduct.restore();
    })
    it('retorna true', async () => {
      const result = await productsServices.deleteProduct(1);
      expect(result).to.be.equals(true);
    })
  })

  describe('Teste de mensagem not found', () => {
    before(async () => {
      const execute = false;
      sinon.stub(productsModel, 'getProductById').resolves(execute);
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
    })
  
    after(async () => {
      productsModel.getProductById.restore();
      productsModel.deleteProduct.restore();
    })
    it('retorna product not found', async () => {
      const result = await productsServices.deleteProduct(1);
      expect(result).to.be.eql({ message: 'Product not found' });
    })
  })
})

describe('4- Teste do service createProduct', () => {

  describe('Teste bem sucedido', () => {
    before(async () => {
      const execute = payloadBD;
      const body = { id: 4, name: "Nome teste", quantity: 10 };
      sinon.stub(productsModel, 'getProducts').resolves(execute);
      sinon.stub(productsModel, 'createProduct').resolves(body)
    })
  
    after(async () => {
      productsModel.getProducts.restore();
      productsModel.createProduct.restore();
    })
    it('retorna um objeto', async () => {
      const result = await productsServices.createProduct({name: "Nome teste", quantity: 10});
      expect(result).to.be.a('object');
    })
  })

  describe('Teste mal sucedido', () => {
    before(async () => {
      const execute = payloadBD;
      sinon.stub(productsModel, 'getProducts').resolves(execute);
    })
  
    after(async () => {
      productsModel.getProducts.restore();
    })
    it('retorna um array', async () => {
      const result = await productsServices.createProduct({ name: 'Martelo de Thor', quantity: 10 });
      expect(result).to.be.eql({ message: 'Product already exists' });
    })
  })
})

describe('5- Teste do service getProductById', () => {

  before(async () => {
    const execute = payloadBD;
    sinon.stub(productsModel, 'getProductById').resolves(execute);
  })

  after(async () => {
    productsModel.getProductById.restore();
  })

  describe('Teste bem sucedido', () => {
    it('retorna um array', async () => {
      const result = await productsServices.getProductById(1);
      expect(result).to.be.a('array');
    })
  })
})
