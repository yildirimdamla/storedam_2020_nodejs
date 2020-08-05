var mongoose = require("../Database/mongoose");

const orderManager = {
  Add: function (req, res) {
    var entity = new mongoose.Order();
    entity.creatingDate = new Date();
    entity.updatedDate = entity.creatingDate;
    entity.orderID = req.body.orderID;
    entity.orderAdress = req.body.orderAdress;
    entity.orderedProductsDetail = req.body.orderedProductsDetail;
    entity.orderOwnerCustomerID = req.body.orderOwnerCustomerID;
    entity.orderDate = req.body.orderDate;
    entity.shippedDate = req.body.shippedDate;
    entity.orderTotalPrice = req.body.orderTotalPrice;
    entity.OrderStatus = req.body.OrderStatus;

    entity.save(function (entity) {
      res.send("Order saved successfully!");
    });
  },
  GetAll: function (req, res) {
    mongoose.Order.find({ isDeleted: false }, function (error, data) {
      if (!error) {
        return res.json(data);
      } else {
        return res.json(error);
      }
    });
  },
  getbyid: (req, res) => {
    var id = req.params.id;
    mongoose.Order.findById(id, (err, document) => {
      if (!err) {
        res.json(document);
      } else {
        return res.json(error);
      }
    });
  },
  delete: (req, res) => {
    var orderid = req.body.id;
    mongoose.Order.findById(orderid, (err, document) => {
      if (!err) {
        document.isDeleted = true;
        document.save();
        res.json(document);
      } else {
        return res.json(error);
      }
    });
  },
  forcedelete: (req, res) => {
    var orderid = req.body.id;
    mongoose.Order.deleteOne({ _id: orderid }, (err) => {
      if (!err) {
        res.send("Datanın kökünü kazıdım için rahat olsun");
      } else {
        return res.json(error);
      }
    });
  },
  updateAddress: (req, res) => {
    var orderid = req.body.id;
    mongoose.Order.findById(orderid, (err, document) => {
      if (!err && document != null) {
        document.updatedDate = new Date();
        document.orderAdress = req.body.orderAdress;
        document.save((saveerr, saveresult) => {
          if (!saveerr) {
            res.json(document);
          } else {
            res.json(saveerr);
          }
        });
      } else {
        return res.json(error);
      }
    });
  },
};
module.exports = {
  orderManager,
};
