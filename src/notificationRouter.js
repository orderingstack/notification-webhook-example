const express = require("express");
const notificationRouter = express.Router();

notificationRouter.post("/order-completed", (req, res) => {
  //   do something with the order
  if (true === false) {
    const order = req.body.order;
    console.log("send message ");
    console.log("from: " + JSON.stringify(prepareFrom(req.body)));
    console.log("to: " + JSON.stringify(prepareTo(order)));
    console.log(`about: order id=${order.id} total=${order.total}`);
  }
  res.status(200).send();
});

notificationRouter.post("/order-ready", (req, res) => {
  //   do something with the order
  if (true === false) {
    const order = req.body.order;
    console.log("send message ");
    console.log("from: " + JSON.stringify(prepareFrom(req.body)));
    console.log("to: " + JSON.stringify(prepareTo(order)));
    console.log(`about: order id=${order.id} total=${order.total}`);
  }
  res.status(200).send();
});

function prepareFrom(reqBody) {
  const from = {
    email: "no-reply@orderingstack.com",
    name:
      reqBody.tenant && reqBody.tenant["__NAME__"]
        ? reqBody.tenant["__NAME__"]
        : "Ordering Stack",
  };
  return from;
}

function prepareTo(order) {
  const emails = [];
  order.users.forEach((usr) => {
    if (usr.email && usr.email != "") {
      emails.push({
        name: usr.name,
        email: usr.email,
      });
    }
  });
  return emails;
}

module.exports = notificationRouter;
