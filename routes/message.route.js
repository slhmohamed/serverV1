const { addMessage, getMessages } = require("../controller/message.controller");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;