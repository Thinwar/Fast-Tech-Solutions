import app from "./app.js";

const port = Number(process.env.API_PORT || process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`Fast Tech API listening on http://localhost:${port}`);
});
