
const dotenv = require('dotenv');
const express = require('express')
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.json());

async function getResponse(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.API_SECRET);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // const prompt = ' What is brand ';

    const output = await model.generateContent(prompt);

    // console.log("output ", output.response.text());

    const res = output.response.text();
    return res;

}

    

async function main (){
    const inputValue = document.getElementById('prompt').ariaValueMax;

    const result = await getResponse(inputValue);
    console.log(result);
}


app.post('/data', async (req, res) => {
    console.log(req.body);  // Check if the body is received correctly
    const { prompt } = req.body;
    const response = await getResponse(prompt);
    res.json({ response });
})

app.get('/', (req,res)=>{
    res.render('index')
})

app.listen(PORT, ()=>{
    console.log(`The server is listening at PORT ${PORT}`);
})