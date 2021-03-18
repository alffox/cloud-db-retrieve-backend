# CloudDB Retrieve Backend
This is a NodeJS backend service that retrieves the active DB agents from a remote endpoint on `CloudDB` and a list of supported Databases that will be used for local installations on the `LiferayUP!` tool.

The service will only work when on LiferayHU VPN network.

## How to use this server
1) Ensure you are on the LiferayHU network
2) Clone the repo locally
3) `cd` into the root directory, open a terminal/command line and run `node index.js`

4) In your browser, for example, call this URL:

```
http://localhost:3000/dblist?email=alfonso.crisci%40liferay.com
```

In details: Calling the service on port `3000` and by providing the Liferay employee `email` address (`firstname` + . + `lastname` + `%40liferay.com`) as a parameter at the `/dblist` endpoint.


5) The NodeJS server logs should return a `json` object with the list of locally and remotely available DBs, for example:

```
{
localDBs:['mysql','mssql','oracle','mariadb','postgresql','db2','sybase'],
cloudDBs:['mysql-56','mysql-8','postgresql-94','postgresql-10','mssql-2017','oracle_12.1']
}
```