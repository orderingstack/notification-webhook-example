const express = require("express");
const notificationRouter = require("./notificationRouter");
const { verifySignature } = require("./signatureVerifyMiddleware");
const app = express();

/** this security token should be set in tenant properties under the key "webhookSecurityToken"
 *  you shoud set here your own token!
 */
const webhookSecurityToken = "70d5d9e6-5091-4094-bd8f-161e460b61c7";

app.use(
  express.json({
    // this handles application/json content but also (verify) adds
    // rowBody for checking hash of the raw body with token against incoming x-signature
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);
// we add verifySignature middleware to whole application
app.use("/", verifySignature(webhookSecurityToken), notificationRouter);

module.exports = app;
