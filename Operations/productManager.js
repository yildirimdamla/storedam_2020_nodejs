var mongoose = require("../Database/mongoose");
const productManager = {
  Add: function (req, res) {
    var entity = new mongoose.Product();

    entity.creatingDate = new Date();
    entity.updatedDate = entity.creatingDate;
    entity.category = req.body.category;
    entity.color = req.body.color;
    entity.price = req.body.price;
    entity.stockNumber = req.body.stockNumber;
    entity.pictures = req.body.pictures;
    entity.description = req.body.description;
    entity.tag = req.body.tag;
    entity.size = req.body.size;

    entity.save(function (entity) {
      res.send("Product saved successfully!");
    });
  },
  GetAll: function (req, res) {
    mongoose.Product.find({ isDeleted: false }, function (error, data) {
      if (!error) {
        return res.json(data);
      } else {
        return res.json(error);
      }
    });
  },
  getbyid: (req, res) => {
    var id = req.params.id;
    mongoose.Product.findById(id, (err, document) => {
      if (!err) {
        res.json(document);
      } else {
        return res.json(error);
      }
    });
  },
  update: (req, res) => {
    var productid = req.params.id;
    console.log(productid);
    mongoose.Product.findById(productid, (err, document) => {
      console.log(document);
      if (!err && document != null) {
        document.updatedDate = new Date();
        document.category = req.body.category;
        document.color = req.body.color;
        document.price = req.body.price;
        document.stockNumber = req.body.stockNumber;
        document.pictures = req.body.pictures;
        document.description = req.body.description;
        document.tag = req.body.tag;

        document.save((saveerr, saveresult) => {
          if (!saveerr) {
            res.json(document);
          } else {
            res.json(saveerr);
          }
        });
      }
      if (!err && document == null) {
        res.send("Böyle bir ürün bulunamadı");
      }
      if (err) {
        res.json(err);
      }
    });
  },
  delete: (req, res) => {
    var productid = req.params.id;

    mongoose.Product.findById(productid, (err, document) => {
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
    var productid = req.body.id;
    mongoose.Product.deleteOne({ _id: productid }, (err) => {
      if (!err) {
        res.send("Datanın kökünü kazıdım için rahat olsun");
      } else {
        return res.json(error);
      }
    });
  },
};
module.exports = {
  productManager,
};
