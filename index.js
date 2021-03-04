const http = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3000;

app.use(morgan("combined"));

//http://localhost:3000/dblist?email=vilmos.papp%40liferay.com

app.get("/dblist", function (req, res) {
    const dbListQueryString = req.url.substring("/dblist?email=".length);
    const email = unescape(dbListQueryString);

    console.log(email)

    var options = {
        "method": "POST",
        "hostname": "swarm.liferay.int",
        "port": "55430",
        "path": "/v3/user/auth",
        "headers": {
            "content-type": "application/json",
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.write(JSON.stringify({ email: email }));
    req.end();
});

app.listen(port, function () {
    console.log("Listening on port " + 3000);
});