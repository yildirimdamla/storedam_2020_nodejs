function findByCode(schema, code) {
  return schema.findOne({ code: code });
}
function findByMail(schema, mail) {
  return schema.findOne({ mail: mail });
}

module.exports = {
  findByCode,
  findByMail,
};
