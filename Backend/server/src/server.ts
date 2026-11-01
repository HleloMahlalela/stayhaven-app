import { createApp } from "./app.js";
import { connectToMongoDB } from "./db/mongoose.js";
import { env } from "./config/env.js";

await connectToMongoDB();

const app = createApp();
app.listen(env.PORT, () => {
  console.log(`StayHaven backend running on http://localhost:${env.PORT} (MongoDB connected)`);
});
