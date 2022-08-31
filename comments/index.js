const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

// fake comments database
const commentsDb = [
  // {
  //   id: string,
  //   postId: string,
  //   body: string,
  // }
];

app.get("/comments", async (req, res) => {
  try {
    res.send(commentsDb);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id: postId } = req.params;
  const { body } = req.body;

  try {
    const comment = {
      id: commentsDb.length + 1,
      postId,
      body,
    };

    commentsDb.push(comment);

    await axios.post("http://localhost:9000/events", {
      eventType: "CommentCreated",
      data: { ...comment },
    });

    res.send(comment);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/events", async (req, res) => {
  const { eventType, data } = req.body;

  try {
    switch (eventType) {
      case "CommentUpdated":
        console.log("event-type: CommentUpdated");
        break;

      default:
        break;
    }

    res.send({});
  } catch (error) {
    res.send(error.message);
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Comments Service running on PORT:${PORT}`);
});
