const http = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3000;

const databaseVendors = {
	'localDBs': ['db2', 'mariadb', 'mssql', 'mysql', 'oracle', 'postgresql', 'sysbase']
};

app.use(morgan("combined"));

app.get("/dblist", function (request, response) {
	const dbListQueryString = request.url.substring("/dblist?email=".length);
	const email = unescape(dbListQueryString);

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
			console.log("Authorized");

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
					var agentsJSON = JSON.parse(agents);
					var agentsArray = agentsJSON["agents"];

					var cloudDBs = [];

					for (var i = 0; i < agentsArray.length; i++) {
						var agent = agentsArray[i];
						cloudDBs.push(agent.name);
					}
					//console.log(names);

					databaseVendors.cloudDBs = cloudDBs;

					response.statusCode = 200;
					response.setHeader('Content-Type', 'application/json');
					response.write(JSON.stringify(databaseVendors));
					response.end();
					console.log("Sent Response");
				});
			});

			req.end();
		});
	});

	process.on('uncaughtException', err => {
		console.error('There was an error', err)
		process.exit(1)
	});

	req.write(JSON.stringify({ email: email }));
	req.end();

});

app.listen(port, function () {
	console.log("Listening on port " + port);
});