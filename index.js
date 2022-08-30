const { Router } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
require('./src/db/mongoose');
app.use(express.json());

// Routes file
const productRouter = require('./src/routers/product');
const userRouter = require('./src/routers/user');

app.use(productRouter);
app.use(userRouter);

app.listen(PORT, ()=>{
    console.log('server is running at ' + PORT);
})

/*

// Learning Area
// JWT 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function fun(){
    let token = jwt.sign({_id:'12345'}, 'secretekey');
    console.log(token);

    const isMatch = jwt.verify(token, 'secretekey');
    console.log(isMatch);

}

fun();


// bcryptjs
const bcrypt = require('bcryptjs');

async function fun(){
    let hashed = await bcrypt.hash('password', 8);
    console.log(hashed);
    
    let encrypt = await bcrypt.compare('password1', hashed);
    console.log(encrypt);
}

fun();
*/