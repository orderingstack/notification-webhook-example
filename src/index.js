const app = require("./app");
const port = 3010;

app.listen(port, () => {
  console.log(
    `Ordering Stack notification webhook example app listening at http://localhost:${port}`
  );
});
