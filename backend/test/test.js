var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;
var ROOT_URL = "localhost:3001";

it("Get Profile details of the seller", function (done) {
  chai
    .request(ROOT_URL)
    .get("/api/seller/profile/" + 47)
    .end(function (err, res) {
      expect(res).to.have.status("200");
      done();
    });
});

it("Get all the products added by the seller", function (done) {
  const data = {
    id: 22,
  };
  chai
    .request(ROOT_URL)
    .post("/api/product/viewAllSellerProducts", 123)
    .end(function (err, res) {
      expect(res).to.have.status("201");
      done();
    });
});

it("Get the details of a particular product", function (done) {
  chai
    .request(ROOT_URL)
    .get("/api/product/getProductDetails/5ea8e1cb8b46841facd94cc0")
    .end(function (err, res, body) {
      // console.log(res)
      expect(res).to.have.status(201);
      done();
    });
});

it("Get all Categories in Amazon", function (done) {
  chai
    .request(ROOT_URL)
    .get("/api/admin/get-product-categories")
    .end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

it("Get Customer Addresses by ID", function (done) {
  chai
    .request(ROOT_URL)
    .get("/api/customerDetails/getCustomerAddresses/?userId=" + 22)
    .end(function (err, res) {
      expect(res);
      done();
    });
});

it("Get all sellers", function (done) {
  chai
    .request(ROOT_URL)
    .get("/api/admin/all-sellers?searchTerm=p")
    .end(function (err, res) {
      expect(res);
      done();
    });
});

it("Get Saved Cards by the Customer", function (done) {
  chai
    .request(ROOT_URL)
    .get("/api/customerDetails/getCustomerCards/?userId=" + 22)
    .end(function (err, res) {
      expect(res);
      done();
    });
});

it("Get Particular details of an order", function (done) {
  chai
    .request("localhost:3001")
    .get("api/seller/getParticularOrderDetails/5e9e50251c9d4400009e1ffd/")
    .end(function (err, res) {
      expect(res);
      done();
    });
});

it("Get the Orders of a seller", function (done) {
  chai
    .request("http://localhost:3001")
    .get("api/orders/getAllOrders/?userId=" + 22)
    .end(function (err, res) {
      expect(res);
      done();
    });
});

it("Get all the reviews and ratings added by the user", function (done) {
  const data = {
    id: 22,
  };
  chai
    .request(ROOT_URL)
    .post("/api/auth/userprofile/", 22)
    .end(function (err, res) {
      expect(res);
      done();
    });
});
