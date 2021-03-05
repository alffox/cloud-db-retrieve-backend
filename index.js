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
            var authTokenJSON = JSON.parse(authToken);
            var token = authTokenJSON.token;

            var options = {
                "method": "GET",
                "hostname": "swarm.liferay.int",
                "port": "55430",
                "path": "/v3/registry/active",
                "headers": {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            };

            var req = http.request(options, function (res) {
                var chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    var agents = Buffer.concat(chunks);
                    //console.log(agents.toString());
                    var agentsJSON = JSON.parse(agents);
                    console.log(agentsJSON);

                });
            });

            req.end();
        });
    });

    req.write(JSON.stringify({ email: email }));
    req.end();
    res.end();

});

app.listen(port, function () {
    console.log("Listening on port " + 3000);
});