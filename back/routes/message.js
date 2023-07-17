const router = require("express").Router();
const Message = require("../models/Message");
const {EventEmitter} = require("events")
const eventEmitter = new EventEmitter()

router.post("/", async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    // const saveMessage = await newMessage.save();
    
    
    eventEmitter.emit('message', newMessage)
    res.status(200).json(newMessage);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

//getting the message
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  router,
  eventEmitter
};
