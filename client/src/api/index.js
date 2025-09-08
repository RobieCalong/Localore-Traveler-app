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
    console.log("this is questID at acceptUserQuest: ", questId);
    const res = await fetch(`${BASE_URL}/usersquests/quest/${questId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    });

    console.log(res);
    if (!res.ok) throw new Error("Failed to accept UserQuest");

    const data = await res.text();
    // console.log("POST UserQuest accepted request *****", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

//getting users_quests.id
export async function fetchUserQuestIdByQuestId(questId) {
  try {
    const res = await fetch(`${BASE_URL}/usersquests/quest/${questId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    });

    if (!res.ok) throw new Error("usersquest_ID not found");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function markUserQuestComplete(usersQuestId, imageUrl) {
  try {
    const res = await fetch(
      `${BASE_URL}/usersquests/${usersQuestId}/complete`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token2}`,
        },
        body: JSON.stringify({ quest_image_url: imageUrl }),
      }
    );

    if (!res.ok) throw new Error("Failed to mark quest complete!");
    const data = await res.json();
    // console.log("PUT UserQuest mark Complete *****", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
