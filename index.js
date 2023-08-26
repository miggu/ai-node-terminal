import openAI from "./config/index.js";
import { logGreen, logMagenta } from "./config/consoleColours.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  const messages = [];

  console.log(``);
  logGreen(`Welcome to the Terminal Node ChatGPT4, How are you today? `);
  logMagenta(`=========================================================`);
  console.log(``);

  const askChatGPT = (question, f) => {
    messages.push({ role: "user", content: question });

    // console.log(messages); Will show array of messages , conversation
    return openAI.chat.completions
      .create({
        messages,
        model: "gpt-4",
      })
      .then(({ choices: [{ message: { content } = {} } = {}] = [] }) => {
        f(`Bot: ${content}`);
        return content;
      })
      .then((content) => {
        messages.push({ role: "assistant", content });
      })
      .catch(console.error);
  };

  const chatLoop = () => {
    const userInput = readlineSync.question(colors.yellow("You: "));
    if (userInput.toLowerCase() === "exit") {
      return;
    }

    askChatGPT(userInput, logGreen).then(() => chatLoop());
  };

  chatLoop();
}

main();
