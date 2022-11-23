const router = require('express').Router()

const {
    getAllPost,
    getOnePost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController')

router.route('/').get(getAllPost).post(createPost)
router.route('/:id').get(getOnePost).put(updatePost).delete(deletePost)

module.exports = router