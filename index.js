const http = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3000;

app.use(morgan("combined"));

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
            var authToken = Buffer.concat(chunks);
            console.log(authToken.toString());
            var authTokenJSON = JSON.parse(authToken);
            var token = authTokenJSON.token;
            console.log(token);
        });
    });

    req.write(JSON.stringify({ email: email }));
    req.end();
    res.end();
});

app.listen(port, function () {
    console.log("Listening on port " + 3000);
});