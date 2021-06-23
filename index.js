const express = require('express');
const app = express();
const Url = require('./models/Url');
app.use(express.json({ extended: false }));


const connectDB = require('./config/dbconnect');
// DBconnect info saved in config
connectDB();


// Setting up front-end
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/index', async(req, res) => {
    const urls = await Url.find()
    res.render('index.ejs', { urls: urls });
})


// Routes 
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/posturl'));


// Port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));