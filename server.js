const { check, body, validationResult } = require("express-validator");

var app = require("express")();
var bodyParser = require("body-parser");
var mongoose = require("./Database/mongoose");

var http = require("http").createServer(app);

var product = require("./Operations/productManager");
var admin = require("./Operations/adminManager");
var order = require("./Operations/orderManager");
var account = require("./Operations/accountManager");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Storedam information center  but We need to know exactly what you want to show you ..."
  );
});

app.post("/product/add", (req, res) => {
  product.productManager.Add(req, res);
});

app.get("/product/list", (req, res) => {
  product.productManager.GetAll(req, res);
});
app.get("/product/:id", (req, res) => {
  product.productManager.getbyid(req, res);
});
app.post("/product/update/:id", (req, res) => {
  product.productManager.update(req, res);
});
app.post("/product/delete/:id", (req, res) => {
  product.productManager.delete(req, res);
});
app.post("/product/forcedelete", (req, res) => {
  product.productManager.forcedelete(req, res);
});

app.post("/product.productManager/add", (req, res) => {
  product.productManager.Add(req, res);
});
app.get("/account/list", (req, res) => {
  account.accountManager.GetAll(req, res);
});
app.get("/account/:id", (req, res) => {
  account.accountManager.getbyid(req, res);
});
app.post("/account/forcedelete", (req, res) => {
  account.accountManager.forcedelete(req, res);
});
app.post("/account/delete", (req, res) => {
  account.accountManager.delete(req, res);
});
app.post("/account/updatePassword", (req, res) => {
  account.accountManager.updatePassword(req, res);
});
app.post("/account/updateAccount", (req, res) => {
  account.accountManager.updateAccountDetails(req, res);
});
app.post("/order/add", (req, res) => {
  order.orderManager.Add(req, res);
});
app.get("/order/list", (req, res) => {
  order.orderManager.GetAll(req, res);
});
app.get("/order/:id", (req, res) => {
  order.orderManager.getbyid(req, res);
});
app.post("/order/forcedelete", (req, res) => {
  order.orderManager.forcedelete(req, res);
});
app.post("/order/delete", (req, res) => {
  order.orderManager.delete(req, res);
});
app.post("/order/updateAddress", (req, res) => {
  order.orderManager.updateAddress(req, res);
});

app.post("/admin/add", (req, res) => {
  admin.adminManager.Add(req, res);
});
app.get("/admin/list", (req, res) => {
  admin.adminManager.GetAll(req, res);
});
app.get("/admin/:id", (req, res) => {
  admin.adminManager.getbyid(req, res);
});
app.post("/admin/forcedelete", (req, res) => {
  admin.adminManager.forcedelete(req, res);
});
app.post("/admin/delete", (req, res) => {
  admin.adminManager.delete(req, res);
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log("listening on *:5000");
});
