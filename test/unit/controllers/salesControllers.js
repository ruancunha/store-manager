const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');

describe('1- Teste do controller getSales', () => {
  const response = {};
  const request = {};

  describe('Teste bem sucedido', () => {
    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSales').resolves(true);
    })
  
    after(() => {
      salesServices.getSales.restore();
    })

    it('é chamado com o status 200', async () => {
      await salesController.getSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })

  describe('Teste mal sucedido', () => {
    const product = { message: "blabla" }
    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSales').resolves(product);
    })
  
    after(() => {
      salesServices.getSales.restore();
    })

    it('é chamado com o status 404', async () => {
      await salesController.getSales(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})

describe('2- Teste do controller getSalesById', () => {
  const response = {};
  const request = {};

  describe('Teste bem sucedido', () => {
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSalesById').resolves(true);
    })
  
    after(() => {
      salesServices.getSalesById.restore();
    })

    it('é chamado com o status 200', async () => {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })

  describe('Teste mal sucedido', () => {
    const product = { message: "blabla" }
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSalesById').resolves(false);
    })
  
    after(() => {
      salesServices.getSalesById.restore();
    })

    it('é chamado com o status 404', async () => {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})
