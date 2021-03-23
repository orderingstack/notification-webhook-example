/**
 * middleware for verifing signature header (x-signature) in webhooks requests
 */
const crypto = require("crypto");

const verifySignature = (webhookSecurityToken) => (req, res, next) => {
  const signature = req.headers["x-signature"];
  if (signature) {
    const calculatedSignature = sha256(req.rawBody + webhookSecurityToken);
    console.log("calculated " + calculatedSignature);
    console.log("received " + signature);
    if (calculatedSignature !== signature) {
      //console.log("wrong signature");
      var err = new Error("Wrong signature!");
      err.status = 400;
      return next(err);
    }
  }
  next();
};

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = {
  verifySignature,
};
