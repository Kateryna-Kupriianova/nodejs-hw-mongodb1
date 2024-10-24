import contactService from "../services/contacts.js";

const getContacts = async (req, res, next) => {
    try {
        const contacts = await contactService.getContacts();
        res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactService.getContactById(contactId);
        if (!contact) {
            return res.status(404).json({
      status: 404,
      message: "Contact not found",
    });
        }
        res.json({
      status: 200,
            message: "Successfully found contact with id {contactId}!",
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export default { getContacts, getContactById };
