import app from "./app.js";
import { connectToDatabase } from "./lib/mongo.js";

const port = Number(process.env.API_PORT || process.env.PORT || 4000);

await connectToDatabase();

app.listen(port, () => {
  console.log(`Fast Tech API listening on http://localhost:${port}`);
});
