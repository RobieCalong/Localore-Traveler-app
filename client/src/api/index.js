const BASE_URL = `http://localhost:3000`;

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
    // console.log("this is questID at acceptUserQuest: ", questId);

    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/usersquests/quest/${questId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res);
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
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/usersquests/quest/${questId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(
      `${BASE_URL}/usersquests/${usersQuestId}/complete`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export async function fetchCompletedQuests(userId, token) {
  try {
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/usersquests/completed/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Completed quests not found");
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}

//fetching user info
export async function fetchUserInfo(userId, token) {
  try {
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("User info not found");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchUserBadges(userId, token) {
  try {
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/users_badges/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Badges not found");
    return await res.json();
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export async function fetchUpdateUserExperience() {
  try {
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/level/user/experience`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Updating User Experience failed");

    const data = await res.text();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchUpdateUserLevel() {
  try {
    const token = localStorage.getItem("token");
    // console.log("Using token:", token);

    const res = await fetch(`${BASE_URL}/level/user/levelname`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Updating User Level failed");

    const data = await res.text();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
