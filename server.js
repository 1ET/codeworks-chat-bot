// Express to run server and routes
const express = require("express");

require("dotenv").config();

const OpenAI = require("openai-api");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

// Start up an instance of app
const app = express();

// Use path to work with files and directory paths
const path = require("path");

// Dependencies
const bodyParser = require("body-parser");
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
// connects the server-side code to our client-side code
app.use(express.static("public"));

const dotenv = require("dotenv");
dotenv.config();

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
  console.log(`Server running on ${process.env.PORT}`);
});

let userMessages = [];
let lastMessageText = "";
app.post("/", async (req, res) => {
  userMessages.push(req.body);
  lastMessageText = userMessages[userMessages.length - 1]["newMessageText"];
  res.status(200).send({ response: await createResponse() });
});

let prompt =
  'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n';

// create AI response and change it's prompt
const createResponse = async () => {
  prompt += `\nQ: ${lastMessageText}\n`;
  const gptResponse = await openai.complete({
    engine: "davinci",
    prompt: prompt,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });

  let answer = gptResponse.data.choices[0].text;
  prompt += `${answer}`;
  return answer;
};

