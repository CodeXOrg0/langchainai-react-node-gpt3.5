// Imports
const express = require('express')

const app = express();

const cors = require('cors')
const dotenv = require("dotenv");

// LangChain imports
const { OpenAI } =  require("langchain");
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");

dotenv.config();

// Middleware
app.use(cors())
app.use(express.json());


// Receiving data from App.js
let data

app.post('/', (req, res) => {
    data = req.body.data
    console.log(data)
})

// Async function with LangChain to use the data and a prompt to generate a response
const prompt = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
      // The `question` variable is the data received from App.js
      const template = "PROMPT HERE : {question}?";
      const prompt = new PromptTemplate({
        template: template,
        inputVariables: ["question"],
      });

      const chain = new LLMChain({ llm: model, prompt: prompt });
      const response = await chain.call({ question: value });

      resolve(response);
    } catch (err) {
      console.log(err);
    }
  });
};

// Sending the response to App.js
app.get('/', async (req, res) => {
  const response = await prompt(data);
  res.json(response);
});

// Change the port if you wish to !
app.listen(8000, () => {
  console.log('Server listening on port 8000');
})
