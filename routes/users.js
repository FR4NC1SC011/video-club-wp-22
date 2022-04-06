const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.list);

router.get('/:id', controller.index);

router.post('/', controller.create);

router.delete('/:id', controller.destroy);

module.exports = router;
