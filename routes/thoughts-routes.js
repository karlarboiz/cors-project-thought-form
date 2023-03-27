const express = require('express');
const router = express.Router();
const createThoughts = require('../controllers/thoughts-controller');

router.get('/show-thoughts',createThoughts.showThoughts);

router.post('/thought-create',createThoughts.createThoughts);

router.get('/thought-update/:id',createThoughts.getThoughtData)

router.patch('/thought-update/:id',createThoughts.updateThoughts);

router.delete('/thought-delete/:id',createThoughts.deleteThoughts)

module.exports = router;