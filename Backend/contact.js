const express = require("express");
var router = express.Router();
let contact = require("./contact.modal");

router.route("/").get((req, res) => {
  contact
    .find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const contactno = req.body.contactno;
  const email = req.body.email;
  const date = Date.parse(req.body.date);
  const newContact = new contact({ username, contactno, email, date });

  newContact
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  contact
    .findById(req.params.id)
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  contact
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Contactc deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  contact
    .findById(req.params.id)
    .then((contact) => {
      contact.username = req.body.username;
      contact.contactno = req.body.contactno;
      contact.email = req.body.email;
      contact.date = Date.parse(req.body.date);

      contact
        .save()
        .then(() => res.json("contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
