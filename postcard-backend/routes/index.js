const express = require('express');
const router = express.Router();
const { verifyJwtToken } = require('../middleware/auth');
const userCtrl = require('../controller/user')
const postCtrl = require('../controller/postCard')
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.signup);
router.get('/get-profile', [verifyJwtToken], userCtrl.getProfile);
router.post('/logout', [verifyJwtToken], userCtrl.logout);
router.post('/add-post-card', [verifyJwtToken], postCtrl.addPostCard);
router.get('/get-post-cards', [verifyJwtToken], postCtrl.getPostCard);
router.get('/delete-post-cards/:id', [verifyJwtToken], postCtrl.deletPostCard);
router.get('/get-post-card-by-id/:id', [verifyJwtToken], postCtrl.getPostCardById);
router.post('/update-post-card', [verifyJwtToken], postCtrl.updatePostCard);


module.exports = router;