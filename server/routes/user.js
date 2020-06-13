const express =  require('express');
const router = express.Router();
const userController = require('../controllers/controller');




router.get("", userController.getAllUsers);
router.post("", userController.addUser);
router.patch('/:id', userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get('/:id/',userController.getUser);




module.exports = router;