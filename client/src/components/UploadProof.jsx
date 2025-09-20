import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserQuestIdByQuestId, markUserQuestComplete } from "../api/index";
import { useState } from "react";
import "../styles/UploadProof.css";

function UploadProof() {
  const { id } = useParams();
  // id useParams refers to quest_id from the react route /quests/:id/upload

  const [usersQuestID, setUsersQuestID] = useState(null);

  const navigate = useNavigate();

  // getting usersQuestID and set useState
  useEffect(() => {
    async function getUserQuestId(id) {
      const data = await fetchUserQuestIdByQuestId(id);
      // console.log("this is UserQuestID: ", data);
      setUsersQuestID(data.id);
    }
    getUserQuestId(id);
  }, []);

  // complete users quest by submitting URL photo based on usersQuestID
  async function uploadImageUrl(evt) {
    evt.preventDefault();

    // formData is used to get the imageURL needed to store to the database to mark a quest complete
    const formData = new FormData(evt.target);
    const imageUrl = formData.get("img-url");
    // console.log("this is imageUrl: ", imageUrl); // hopefully its datatype: string

    const data = await markUserQuestComplete(usersQuestID, imageUrl);
    // console.log(data); // response from api server marking the quest complete
    return navigate(`/quests/${id}/complete`);
  }

  return (
    <div>
      <h2 className="upload-img-title">Please upload an image URL</h2>
      <img src={`/assets/cloud.png`} alt="upload-cloud-image" />
      <div>
        <form onSubmit={uploadImageUrl}>
          <input
            className="upload-form"
            type="text"
            name="img-url"
            placeholder="Image URL"
          />
          <br />
          <button className="proof-btn" type="submit" name="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadProof;
