const BASE_URL = `http://localhost:3000`;

//hard-coded token for user_id = 2        { "username": "newuser", "password": "newuser12345"  }
const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzU3MDg4NzgwLCJleHAiOjE3NTc2OTM1ODB9.QQcalQqHBM3ixwTUhe_y9lN0FgJoUkQP8dRHA7cL-iU`;
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

export async function acceptUserQuest(questId) {
  try {
    const res = await fetch(`${BASE_URL}/usersquests/quest/${questId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token2}`,
      },
    });

    if (!res.ok) throw new Error("Failed to accept UserQuest");

    const data = await res.json();
    // console.log("POST UserQuest accepted request *****", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
