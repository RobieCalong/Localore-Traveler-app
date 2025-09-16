import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserInfo, fetchCompletedQuests, fetchUserBadges } from  "../api/index";

export default function UserHomepage () {
    const { userId: paramUserId } = useParams();
    const [user, setUser] = useState(null);
    const [badges, setBadges] = useState([]);
    const [completedQuests, setCompletedQuests] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Prefer userId from route param, fallback to localStorage
        const userId = paramUserId || localStorage.getItem("userId");

        async function getData() {
            try {
                if (userId && token) {
                    const userData = await fetchUserInfo(userId, token);
                    console.log("User data response:", userData);
                    if (!userData || userData.error) {
                        setError(userData?.error || "No user data returned");
                        return;
                    }
                    setUser(userData);

                    const quests = await fetchCompletedQuests(userId, token);
                    console.log("Completed quests response:", quests);
                    setCompletedQuests(Array.isArray(quests) ? quests : []);

                    const badgesData = await fetchUserBadges(userId, token);
                    console.log("Badges response:", badgesData);
                    setBadges(Array.isArray(badgesData) ? badgesData : []);
                } else {
                    setError("Missing userId or token");
                }
            } catch (err) {
                setError("Error fetching data: " + err.message);
                console.error(err);
            }
        }
        getData();
    }, [paramUserId]);

    return (
        <div>
            {error && <div style={{ color: "red" }}>Error: {error}</div>}
            <div>
                <h1>Welcome, {user?.username}</h1>
                <p>Level: {user?.level_name}</p>
                <p>Experience: {user?.experience}</p>
            </div>

            <div>
                <h2>Completed Quests:</h2>
                <ul>
                    {completedQuests.map(q => (
                        <li key={q.id}>{q.title}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Badges:</h2>
                <ul>
                    {badges.map(badge => (
                        <li key={badge.id}>
                            <img src={badge.badge_image} alt={badge.name} width={40} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

