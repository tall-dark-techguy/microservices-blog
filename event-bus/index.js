const express = require("express");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.post("/events", async (req, res) => {
  try {
    const event = req.body;

    // notify all services about event emitted

    res.send("OK");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Event-Bus Service running on PORT:${PORT}`);
});
