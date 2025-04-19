const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors({
    origin: 'http://localhost:5173'
}));
server.use(express.json());

server.use('/user', require('./routes/userRouter.js'));
server.use('/travel', require('./routes/travelRouter.js'));
server.use('/journey', require('./routes/journeyRouter.js'));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});