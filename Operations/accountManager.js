var mongoose = require("../Database/mongoose");
const accountManager = {
  Add: function (req, res) {
    var entity = new mongoose.Account();

    entity.creatingDate = new Date();
    entity.updatedDate = entity.creatingDate;
    entity.accountID = req.body.accountID;
    entity.userFullName = req.body.userFullName;
    entity.accountSecret = req.body.accountSecret;
    entity.userNickname = req.body.userNickname;
    entity.phone = req.body.phone;
    entity.userMail = req.body.userMail;
    entity.address = req.body.address;
    entity.favorites = req.body.favorites;

    entity.ordersID = req.body.ordersID;

    entity.save(function (entity) {
      res.send("Account saved successfully!");
    });
  },
  GetAll: function (req, res) {
    mongoose.Account.find({ isDeleted: false }, function (error, data) {
      if (!error) {
        return res.send(data);
      } else {
        return res.json(error);
      }
    });
  },
  getbyid: (req, res) => {
    var id = req.params.id;
    mongoose.Account.findById(id, (err, document) => {
      if (!err) {
        res.json(document);
      } else {
        return res.json(error);
      }
    });
  },
  delete: (req, res) => {
    var accountid = req.body.id;
    mongoose.Account.findById(accountid, (err, document) => {
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
    var accountid = req.body.id;
    mongoose.Account.deleteOne({ _id: accountid }, (err) => {
      if (!err) {
        res.send("Datanın kökünü kazıdım için rahat olsun");
      } else {
        return res.json(error);
      }
    });
  },
  updatePassword: (req, res) => {
    var accountid = req.body.id;
    mongoose.Account.findById(accountid, (err, document) => {
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
  updateAccountDetails: (req, res) => {
    var accountid = req.body.id;
    mongoose.Account.findById(accountid, (err, document) => {
      if (!err && document != null) {
        document.updatedDate = new Date();
        document.address = req.body.address;
        document.phone = req.body.phone;
        document.userNickname = req.body.userNickname;
        document.userMail = req.body.userMail;
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
  accountManager,
};
