const express = require('express');
require('./models/user');
require('./services/passport');
const mongoose =  require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cokieKey]

    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
//authRoutes(app);






const PORT = process.env.PORT||5000


app.listen(PORT);


//1010109619259-ue8569rbtmimkafmc12h4tu9sqhrdkja.apps.googleusercontent.com

//d-M-S8t1OdOBoJ_f3plXmTtd