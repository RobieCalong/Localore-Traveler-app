import React, { useEffect } from "react";
import { useLocation, useParams, redirect } from "react-router";
import { fetchUserQuestIdByQuestId, markUserQuestComplete } from "../api/index";

function UploadProof() {
  const { id } = useParams();
  const questId = id;

  // GET userId by JWT token from localstorage (when user logins, it saves jwt in localstorage)
  // const jwt = localStorage.getItem("jwt")
  // for now userId is hard-coded
  const userId = 2;

  useEffect(() => {
    async function getUserQuestId(questId) {
      const data = await fetchUserQuestIdByQuestId(questId);
      console.log(data);
    }
    getUserQuestId(questId);
  }, []);

  async function uploadImageUrl(formData) {
    const imageUrl = formData.get("img-url");
    console.log("this is imageUrl: ", imageUrl); // hopefully its datatype: string

    const data = await markUserQuestComplete(usersQuestId, imageUrl);
    return redirect(`/quests/${questId}/complete`);
  }

  return (
    <div>
      <h2>Please upload an image URL</h2>
      <img src={`/assets/cloud.png`} alt="upload-cloud-image" />
      <div>
        <form action={uploadImageUrl}>
          <input type="text" name="img-url" placeholder="Image URL" />
          <button type="submit" name="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadProof;
