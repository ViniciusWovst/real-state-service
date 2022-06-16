import express from 'express';
import "reflect-metadata";

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});