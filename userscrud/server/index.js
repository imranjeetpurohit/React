const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const mongoose = require("mongoose");

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

mongoose
  .connect("mongodb://localhost:27017/myformdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB error:", err);
  });

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", UserSchema);

// Add new user
router.post("/api/users", async (ctx) => {
  const { firstName, lastName } = ctx.request.body;

  if (!firstName || !lastName) {
    ctx.status = 400;
    ctx.body = { message: "First Name and Last Name required" };
    return;
  }

  const newUser = new User({ firstName, lastName });
  await newUser.save();
  ctx.body = { message: "User saved successfully" };
});

// Get all users
router.get("/api/users", async (ctx) => {
  const users = await User.find();
  ctx.body = users;
});

// Delete user
router.delete("/api/users/:id", async (ctx) => {
  const id = ctx.params.id;
  await User.findByIdAndDelete(id);
  ctx.body = { message: "User deleted" };
});

// Update user
router.put("/api/users/:id", async (ctx) => {
  const id = ctx.params.id;
  const { firstName, lastName } = ctx.request.body;

  if (!firstName || !lastName) {
    ctx.status = 400;
    ctx.body = { message: "First Name and Last Name required" };
    return;
  }

  await User.findByIdAndUpdate(id, { firstName, lastName });
  ctx.body = { message: "User updated successfully" };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
