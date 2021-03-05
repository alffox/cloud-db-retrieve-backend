# CloudDB Retrieve Backend
This is a NodeJS backend service that retrieves the active DB agents from a remote endpoint on CloudDB and a list of supported Databases that will be used for local installations on the LiferayUP! tool.

The service will only work when on LiferayHU VPN network.

## How to use this server
1) Clone the repo locally
2) `cd` into the root directory, open a Terminal/Command Line and run `node index.js`

4) You may start calling the service on port `3000` and by providing the Liferay employee `email` address as a parameter at the `/dblist` endpoint, for example:

```
curl http://localhost:3000/dblist?email=vilmos.papp%40liferay.com
```

5) The NodeJS server logs should return an array of available databases for that employee, for example:

```
[ 'DB2-11.5', 'mariadb-10', 'mssql-2017', 'mysql-56', 'mysql-57', 'mysql-8', 'oracle-19', 'oracle12_2', 'postgres-10', 'postgres-11', 'postgres-94' ]
```