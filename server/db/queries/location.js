import db from "#db/client";

export async function getLocations() {
  const sql = `
    SELECT DISTINCT quests.location FROM quests`;
  const { rows: cities } = await db.query(sql);
  return cities;
}

export async function getLocationData(city) {
  //case-insensitive I-LIKE
  const sql = `
    SELECT DISTINCT quests.location FROM quests WHERE location ILIKE $1`;
  const {
    rows: [cityData],
  } = await db.query(sql, [city]);
  return cityData;
}
