const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');

describe('1- Teste do service getProducts', () => {
  const response = {};
  const request = {};

  before(() => {
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getProducts').resolves(true);
  })

  after(() => {
    productsServices.getProducts.restore();
  })

  describe('Teste bem sucedido', () => {
    it('é chamado com o status 200', async () => {
      await productsController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })
})

describe('2- Teste do service getProductById', () => {
  const response = {};
  const request = {};

  describe('Teste bem sucedido', () => {
    before(() => {
      request.body = {};
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getProductById').resolves(true);
    })
  
    after(() => {
      productsServices.getProductById.restore();
    })

    it('é chamado com o status 200', async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })

  describe('Teste mal sucedido', () => {
    before(() => {
      request.body = {};
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getProductById').resolves(false);
    })
  
    after(() => {
      productsServices.getProductById.restore();
    })

    it('é chamado com o status 404', async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})

describe('3- Teste do service createProduct', () => {
  const response = {};
  const request = {};

  describe('Teste bem sucedido', () => {
    before(() => {
      request.body = { name: "blabla", quantity: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'createProduct').resolves(true);
    })
  
    after(() => {
      productsServices.createProduct.restore();
    })

    it('é chamado com o status 201', async () => {
      await productsController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    })
  })

  describe('Teste mal sucedido', () => {
    const product = { message: "blabla" }
    before(() => {
      request.body = { name: "blabla", quantity: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'createProduct').resolves(product);
    })
  
    after(() => {
      productsServices.createProduct.restore();
    })

    it('é chamado com o status 409', async () => {
      await productsController.createProduct(request, response);
      expect(response.status.calledWith(409)).to.be.equal(true);
    })
  })
})

describe('4- Teste do service deleteProduct', () => {
  const response = {};
  const request = {};

  describe('Teste bem sucedido', () => {
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteProduct').resolves(true);
    })
  
    after(() => {
      productsServices.deleteProduct.restore();
    })

    it('é chamado com o status 204', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    })
  })

  describe('Teste mal sucedido', () => {
    const product = { message: "blabla" }
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'deleteProduct').resolves(product);
    })
  
    after(() => {
      productsServices.deleteProduct.restore();
    })

    it('é chamado com o status 404', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})

describe('4- Teste do service editProduct', () => {
  const response = {};
  const request = {};

  describe('Teste bem sucedido', () => {
    before(() => {
      request.params = { id: 1 };
      request.body = { name: "blabla", quantity: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'editProduct').resolves(true);
    })
  
    after(() => {
      productsServices.editProduct.restore();
    })

    it('é chamado com o status 200', async () => {
      await productsController.editProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })

  describe('Teste mal sucedido', () => {
    const product = { message: "blabla" }
    before(() => {
      request.params = { id: 1 };
      request.body = { name: "blabla", quantity: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'editProduct').resolves(product);
    })
  
    after(() => {
      productsServices.editProduct.restore();
    })

    it('é chamado com o status 404', async () => {
      await productsController.editProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})
