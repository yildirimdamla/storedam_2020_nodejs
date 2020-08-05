const { body, validationResult } = require("express-validator");

var app = require("express")();
var bodyParser = require("body-parser");
var mongoose = require("./Database/mongoose");

var http = require("http").createServer(app);

var helpers = require("./Helpers/find");

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

app.post(
  "/product/add",
  [
    body("category")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Kategori boş geçilemez"),
    body("description")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Açıklama boş geçilemez"),
    body("price").notEmpty().trim().escape().withMessage("Fiyat boş geçilemez"),
    body("pictures")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Ürün için en az bir fotoğraf girilmeli"),

    body("code")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Ürün kodu boş geçilemez"),

    body("code").custom((value) => {
      return helpers.findByCode(mongoose.Product, value).then((data) => {
        if (data) {
          return Promise.reject("Ürün kodu var olan ürünle aynı olamaz");
        }
      });
    }),
    body("size")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Ürün boyutu boş geçilemez"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    product.productManager.Add(req, res);
  }
);

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

app.post(
  "/account/add",
  [
    body("userFullName")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("İsim boş geçilemez"),
    body("accountSecret")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Parola boş geçilemez"),
    body("userNickname")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Kullanıcı adı boş geçilemez"),
    body("userMail").isEmail().withMessage("Hatalı email formatı"),
    body("userMail")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Mail boş geçilemez"),

    body("code").custom((value) => {
      return helpers.findByMail(mongoose.Account, value).then((data) => {
        if (data) {
          return Promise.reject("Girdiğiniz mail sistemde kayıtlı");
        }
      });
    }),
    body("phone")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Telefon boş geçilemez"),
  ],
  (req, res) => {
    account.accountManager.Add(req, res);
  }
);
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
