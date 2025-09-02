import express, { Router } from "express";

const router = express(Router());

router.route("/").get((req, res) => {
  res.status(200).send("route /usersquests works");
});

export default router;
