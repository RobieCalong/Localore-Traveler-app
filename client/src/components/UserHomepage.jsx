import { useState } from "react";
import { useEffect } from "react";

export default function userHomapge () {
    const [user, setUser] = useState(null)
    const [badges, setBadges] = useState([])
    const [completedQuests, setCompletedQuests] = useState([])

    useEffect(() => {
        fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data));

        fetch(`api/users_badges/${userId}`)
    })
    return (
        <>
            <h1>Welcome User</h1>
        </>
    )
}
    
