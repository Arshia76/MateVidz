const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

app.use(cors());
app.use('/backend/uploads', express.static('./backend/uploads'));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/search', require('./routes/search'));

const PORT = process.env.PORT | 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
