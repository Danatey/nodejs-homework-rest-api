const express = require("express");
const router = express.Router();

const guard = require("../../helpers/guard");
const { contactValidation, favoriteValidation } = require("./validation");

const {
  getListContacts,
  getContact,
  saveContact,
  deleteContact,
  changeContact,
  changeStatusContact,
} = require("../../controllers/contacts");

router.get("/", guard, getListContacts);

router.get("/:contactId", guard, getContact);

router.post("/", guard, contactValidation, saveContact);

router.delete("/:contactId", guard, deleteContact);

router.put("/:contactId", guard, contactValidation, changeContact);

router.patch(
  "/:contactId/favorite",
  guard,
  favoriteValidation,
  changeStatusContact
);

module.exports = router;
