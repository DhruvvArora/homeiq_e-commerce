const express = require('express');
const multer = require('multer');
const { openTicket, getTicketStatus } = require('../controllers/ticketController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/submit', upload.single('image'), openTicket);
router.get('/status/:ticketNumber', getTicketStatus);

module.exports = router;

