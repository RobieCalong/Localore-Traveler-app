import { useState } from "react";
import { useEffect } from "react";
import { fetchUserInfo, fetchCompletedQuests, fetchUserBadges } from  "../api/index";

export default function userHomapge () {
    const [user, setUser] = useState(null)
    const [badges, setBadges] = useState([])
    const [completedQuests, setCompletedQuests] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        async function getData() {
            if (userId && token) {
                const userData = await fetchUserInfo(userId, token);
                setUser(userData)

                const quests = await fetchCompletedQuests(userId, token);
                setCompletedQuests(quests);

                const badges = await fetchUserBadges(userId, token);
                setBadges(badges)
            }
        }
        getData();
    }, []);

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
                    {
                        completedQuests.map(q => (
                        <li key={q.id}>{q.title}</li>
                    ))
                    }
                </ul>
            </div>

            <div>
                <h2>Badges:</h2>
                <ul>
                    <li key={badges.id}>
                        <img src={badges.badge_image} alt={badges.name} width={40} />
                    </li>
                </ul>
            </div>

        </div>
    )
}
    
