const express = require('express');
const router = express.Router();

router.get('/',  (_req, res) => {
  res.render('index',  
  {
    title: 'CS - Inicio',
    layout: 'layout/template',
  });
});

module.exports = router;