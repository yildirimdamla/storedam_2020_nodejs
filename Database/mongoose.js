const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://yildirimdam:FEDbilgeadam@cluster0-hhhtz.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const Schema = mongoose.Schema;

const Table_ExampleSchema = new Schema({
  creatingDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  name: String,
  position: String,
  office: String,
  age: String,
  start_date: String,
  salary: Number,
  creatingDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const TableExample = mongoose.model("Table_Examples", Table_ExampleSchema);

const ProductSchema = new Schema({
  creatingDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  category: String,
  color: Array,
  unitprice: Number,
  stockNumber: Number,
  pictures: Array,
  description: String,
  tag: Array,
  size: Array,
  sort: Number,
});

const Product = mongoose.model("Products", ProductSchema);

const AccountSchema = new Schema({
  creatingDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  accountID: String,
  userFullName: String,
  accountSecret: String,
  userNickname: String,
  userMail: String,
  phone: String,
  address: Array,
  favorites: Array,
  ordersID: Array,
});
const Account = mongoose.model("Accounts", AccountSchema);

const AdminSchema = new Schema({
  creatingDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  adminID: String,
  adminFullName: String,
  adminSecret: String,
  adminNickname: String,
  adminMail: String,
  adminPhone: String,
});
const Admin = mongoose.model("Admins", AdminSchema);

const OrderSchema = new Schema({
  creatingDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  accountID: String,
  orderAdress: String,
  orderedProductsDetail: [
    {
      productid: String,
      quantity: Number,
      UnitPrice: Number,
      Discount: Number,
    },
  ],
  orderOwnerCustomerID: String,
  shippedDate: String,
  orderTotalPrice: Number,
  OrderStatus: Array,
});
const Order = mongoose.model("Orders", OrderSchema);

module.exports = {
  Account,
  Product,
  Admin,
  Order,
  TableExample,
};
