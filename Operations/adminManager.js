var mongoose = require("../Database/mongoose");

const adminManager = {
  Add: function (req, res) {
    var entity = new mongoose.Admin();

    entity.creatingDate = new Date();
    entity.updatedDate = entity.creatingDate;
    entity.adminID = req.body.adminID;
    entity.adminSecret = req.body.adminSecret;
    entity.adminNickname = req.body.adminNickname;
    entity.adminMail = req.body.adminMail;
    entity.adminPhone = req.body.adminPhone;

    entity.save(function (entity) {
      res.send("Admin saved successfully!");
    });
  },
  GetAll: function (req, res) {
    mongoose.Admin.find({ isDeleted: false }, function (error, data) {
      if (!error) {
        return res.json(data);
      } else {
        return res.json(error);
      }
    });
  },
  getbyid: (req, res) => {
    var id = req.params.id;
    mongoose.Admin.findById(id, (err, document) => {
      if (!err) {
        res.json(document);
      } else {
        return res.json(error);
      }
    });
  },
  delete: (req, res) => {
    var adminID = req.params.id;
    mongoose.Admin.findById(adminID, (err, document) => {
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
    var adminID = req.body.id;
    mongoose.Admin.deleteOne({ _id: adminID }, (err) => {
      if (!err) {
        res.send("Datanın kökünü kazıdım için rahat olsun");
      } else {
        return res.json(error);
      }
    });
  },
  updatePassword: (req, res) => {
    var adminID = req.params.id;
    mongoose.Admin.findById(adminID, (err, document) => {
      if (!err && document != null) {
        document.updatedDate = new Date();
        document.accountSecret = req.body.accountSecret;
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
  updateAdminDetails: (req, res) => {
    var adminID = req.params.id;
    mongoose.Admin.findById(adminID, (err, document) => {
      if (!err && document != null) {
        document.updatedDate = new Date();
        document.phone = req.body.phone;
        document.adminNickname = req.body.adminNickname;
        document.adminMail = req.body.adminMail;
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
  adminManager,
};
