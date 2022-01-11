const router = require('express').Router();
const {  } = require('../../controllers/user-controller');

// api/users
router.route('/').get();
router.route('/:id').get();
router.route('/').post();
router.route('/:id').put();
router.route('/:id').delete();

// api/users/:userId/friends/:friendId
router.route('/:id/friends/:fid').post();
router.route('/:id/friends/:fid').delete();

module.exports = router;