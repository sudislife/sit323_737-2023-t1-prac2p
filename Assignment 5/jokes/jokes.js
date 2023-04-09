const express = require('express');
const app = express();
const PORT = process.env.PORT;

const jokes = [
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "Why do we tell actors to 'break a leg?' Because every play has a cast.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "Why did the hipster burn his tongue? He drank his coffee before it was cool.",
  "What did one toilet say to the other toilet? You look a bit flushed.",
  "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bagels."
];

app.get('/joke', (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];
  res.send(randomJoke);
});

app.listen(PORT, () => {
  console.log("Joke service listening at port " + PORT);
});