const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.post("/events", async (req, res) => {
  try {
    const event = req.body;

    /*
     * notify all services about event emitted
     */
    await axios.post("http://localhost:2000/events", event); // comments service
    await axios.post("http://localhost:3000/events", event); // query service
    await axios.post("http://localhost:1000/events", event); // posts service

    console.log(`event emitted: ${event.eventType || "none"}`);

    res.send({});
  } catch (error) {
    console.log(error.message);
    res.send({});
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Event-Bus Service running on PORT:${PORT}`);
});
