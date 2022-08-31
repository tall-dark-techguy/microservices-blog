const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());

// fake post database:
const postsDb = [
  // {
  //     id: string,
  //     title: string,
  //     body: string,
  // }
];

app.post("/posts", async (req, res) => {
  const { title, body } = req.body;

  try {
    const post = {
      id: postsDb.length + 1,
      title,
      body,
    };

    postsDb.push(post);

    await axios.post("http://localhost:9000/events", {
      eventType: "PostCreated",
      data: { ...post },
    });

    res.send(post);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/posts", async (req, res) => {
  res.send(postsDb);
});

app.post("/events", async (req, res) => {
  try {
    const { eventType, data } = req.body;

    if (eventType === "PostUpdated") {
    }

    res.send({});
  } catch (error) {
    res.send(error.message);
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Posts Service running on PORT:${PORT}`);
});
