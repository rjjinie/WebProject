const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/reader.controller");

router.get('/:id', controller.getInfo)
router.put('/:id', controller.updateInfo)

module.exports = router;