import express, { Router } from "express";

import getUserFromToken from "#middleware/getUserFromToken";
import requireUser from "#middleware/requireUser";
import { getLocationData, getLocations } from "#db/queries/location";
import { getQuestsByLocation } from "#db/queries/quests";

const router = express(Router());

// router.use(getUserFromToken);
// router.use(requireUser);

//  /location
router.route("/").get(async (req, res) => {
  const locations = await getLocations();
  res.status(200).json(locations);
});

// //  /^([a-z]+)(\s+[a-z]+)?(\s+[a-z]+)?$/i.test(city)
router.param("city", async (req, res, next, city) => {
  //regex matches city names and limits 1 to 3 words
  //must be all lower case characters && does not contain a number
  if (!/^([a-z]+)(\s+[a-z]+)?(\s+[a-z]+)?$/.test(city)) {
    return res.status(400).send("Must be a proper City name");
  }

  // cityData hold an object of property location: city name  { location: 'Houston' }
  const cityData = await getLocationData(city);
  //   console.log("city Name is: ", cityData);

  if (!cityData) {
    return res.status(404).send("City not found");
  }

  req.city = cityData.location;
  //   console.log("req city is: ", req.city);
  next();
});

//this route returns the city name if in database
router.route("/:city").get(async (req, res) => {
  const cityData = await getLocationData(req.city);

  res.status(200).json(cityData);
});

//  /location/:city/quests
router.route("/:city/quests").get(async (req, res) => {
  const cityQuests = await getQuestsByLocation(req.city);
  res.status(200).json(cityQuests);
});

export default router;
