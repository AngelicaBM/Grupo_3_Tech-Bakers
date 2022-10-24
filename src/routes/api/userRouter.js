const express = require('express');
const router = express.Router();

const userController = require('../../controllers/api/userController');


router.get('/', userController.list);
router.get('/:id', userController.detail);
// router.post('/', userController.store);
// router.delete('/:id', userController.delete);

module.exports = router;


