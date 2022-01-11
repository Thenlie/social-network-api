const router = require('express').Router();
const {  } = require('../../controllers/thought-controller');

// api/thoughts
router.route('/').get();
router.route('/:id').get();
router.route('/').post();
router.route('/:id').put();
router.route('/:id').delete();

// api/thoughts/:thoughtId/reactions
router.route('/:id/reactions').post();
router.route('/:id/reactions/:rid').delete();


module.exports = router;