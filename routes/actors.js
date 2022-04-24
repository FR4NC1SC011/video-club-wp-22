const express = require('express');
const controller = require('../controllers/actors');
const router = express.Router();

router.get('/:page?', controller.list);

router.get('/show/:id', controller.index);

router.post('/', controller.create);

router.patch('/:id', controller.replace);

router.put('/:id', controller.edit);

router.delete('/:id', controller.destroy);

module.exports = router;
