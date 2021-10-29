const { HttpCode } = require("../config/HttpCode");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../repository/contacts");

const getListContacts = async (_req, res, _next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: HttpCode.OK,
    data: { contacts },
    message: "router.get is OK",
  });
};

const getContact = async (req, res, _next) => {
  const contact = await getContactById(req.params.contactId);

  if (contact) {
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { contact },
      message: `${contact.name} found`,
    });
  } else {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: `${contact.name} not found`,
    });
  }
};

const saveContact = async (req, res, _next) => {
  const contact = await addContact(req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    data: { contact },
    message: `${contact.name} added`,
  });
};

const deleteContact = async (req, res, _next) => {
  const { contactId } = req.params;
  const remove = await removeContact(contactId);

  if (remove === false) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "/:contactId not found",
    });
  } else {
    res.json({ message: "router.delete is OK" });
  }
};

const changeContact = async (req, res, _next) => {
  const contact = await updateContact(req.params.contactId, req.body);

  if (contact) {
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { contact },
      message: `${contact.name} updated`,
    });
  } else {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "contact not found",
    });
  }
};

const changeStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;

  if (!body) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: "Missing field favorite" });
  }

  try {
    const result = await updateStatusContact(id, body);

    if (!result) {
      return res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
    }
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: result,
      message: "Contact status was updated",
    });
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  getListContacts,
  getContact,
  saveContact,
  deleteContact,
  changeContact,
  changeStatusContact,
};
