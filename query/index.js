const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// fake query database
const queryDb = [
  // {
  //   postId: string,
  //   title: string,
  //   body: string,
  //   comments: [
  //     {
  //       postId: string,
  //       commentId: string,
  //       body: string,
  //     }
  //   ]
  // }
];

app.get("/posts", async (req, res) => {
  res.send(queryDb);
});

app.post("/events", async (req, res) => {
  const { eventType, data } = req.body;

  try {
    if (eventType === "PostCreated") {
      const { id: postId, title, body } = data;

      const newPost = {
        postId: postId.toString(),
        title,
        body,
        comments: [],
      };

      queryDb.push(newPost);
    }

    if (eventType === "CommentCreated") {
      const { id: commentId, postId, body } = data;

      const newComment = {
        postId,
        commentId,
        body,
      };

      const post = queryDb.find((p) => p.postId === postId);

      post.comments.push(newComment);
    }

    res.send({});
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Query Service is running on PORT:${PORT}`);
});
