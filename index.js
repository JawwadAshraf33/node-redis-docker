const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();

const client = redis.createClient({
  //   // provide the connection url localhost, https
  //   // or link it to docker compose docker service of redis
  host: "redis-server",
  port: 6379
});
// set visits intial value
client.set("visits", 0);

app.get("/", (req, res) => {
  //check if container crashes
  process.exit(0);
  client.get("visits", (err, visits) => {
    res.send("Number of visits : " + visits);

    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
