const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

// api/users
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route('/:id/friends/:fid').post();
router.route('/:id/friends/:fid').delete();

module.exports = router;