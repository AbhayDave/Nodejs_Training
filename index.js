import express from "express";

const app = express();

let todos = [
  {
    id: 1,
    isDone: false,
    task: "complete project",
  },
];

app.use(express.urlencoded({ extended: true }));
// This is required to handle urlencoded data
app.use(express.json());
// This to handle json data coming from requests mainly post

app.get("/", (req, res) => {
  res.send(todos);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  res.send(todos[id - 1]);
});

app.post("/", (req, res) => {
  const todo = req.body;
  // console.log(req.body);
  todo.id = todos.length + 1;
  todos.push(todo);
  res.send(todo);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter((todo) => todo.id != id);
  res.send("Done");
});

app.patch("/:id/:isDone", (req, res) => {
  const { id, isDone } = req.params;
  todos = todos.map((todo) => {
    if (todo.id == id) {
      todo = { ...todo, isDone: isDone };
    }

    return todo;
  });
  res.send("Done");
});

app.listen(8000, () => {
  console.log("Server Listining on 8000");
});
