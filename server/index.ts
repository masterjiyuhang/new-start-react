import express, { Express, Router, Request, Response, NextFunction } from "express";

const app: Express = express();

app.get("/", function (req, res) {
	res.send("Hello World!");
});

app.listen(3006, () => {
	console.log("success serve http://localhost:3006");
});
