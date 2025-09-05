const BASE_URL = `http://localhost:3000`;
//////////////////////////////////////////////////////////

export async function fetchAllLocations() {
  try {
    const res = await fetch(`${BASE_URL}/location`);

    if (!res.ok) throw new Error("Locations not found");

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchQuestsByLocation(city) {
  try {
    const res = await fetch(`${BASE_URL}/location/${city}/quests`);

    if (!res.ok) throw new Error("Quests by location not found");

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
