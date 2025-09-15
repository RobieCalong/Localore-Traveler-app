
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserInfo, fetchCompletedQuests, fetchUserBadges } from  "../api/index";

export default function UserHomepage () {
    const { userId: paramUserId } = useParams();
    const [user, setUser] = useState(null);
    const [badges, setBadges] = useState([]);
    const [completedQuests, setCompletedQuests] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Prefer userId from route param, fallback to localStorage
        const userId = paramUserId || localStorage.getItem("userId");

        async function getData() {
            if (userId && token) {
                const userData = await fetchUserInfo(userId, token);
                setUser(userData);

                const quests = await fetchCompletedQuests(userId, token);
                setCompletedQuests(quests);

                const badgesData = await fetchUserBadges(userId, token);
                setBadges(badgesData);
            }
        }
        getData();
    }, [paramUserId]);

    return (
        <div>
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
    
