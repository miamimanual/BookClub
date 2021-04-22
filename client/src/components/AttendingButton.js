import axios from "axios";
import { useState, useEffect } from "react";

export default funtion AttendingButton({id}) {
    const [buttonText, setButtonText] = useState("Attending")
    const [existing, setExisting] = useState(false);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        console.log("axios, get, id", id);
        axios
            .get(`/attending/${id}`)
            .then((response) => {
                console.log("[AttendingButton], axios", response);
                setExisting(true);
                setAccepted(response.data.accepted);
                console.log(
                    "[AttendingButton] axios.get, response.data.sender_id/ id ",
                    response.data.sender_id,
                    id
                );
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log("[FriendButton], axios.get: error 404", error);
                    return;
                }
                console.log("[AttendingButton], axios.get: generic error", error);
            });
    }, [id]);

    useEffect(() => {
        if (!existing) {
            setButtonText("Attending");
            return;
        }
        if (accepted) {
            setButtonText("Not Attending");
            return;
        }
        setButtonText("Attending"); // 
    }, [existing, accepted]);

    function onClick() {
        if (!existing) {
            axios
                .post("/attending", { recipient_id: id })
                .then((response) => {
                    console.log(
                        "[AttendingButton]: onClick: axios.post",
                        response.data
                    );
                    setExisting(true);
                    setAccepted(false);
                });
            return;
        }
        if (accepted) {
            axios.delete(`/attending/${id}`).then(() => {
                console.log("[AttendingButton]: onCLick: axios.put");
                setExisting(false);
                setAccepted(false);
            });
            return;
        }

        axios.delete(`/attending/${id}`).then(() => {
            console.log("[AttendingButton]: onCLick: axios.put");
            setExisting(false);
            setAccepted(false);
        });
    }

    return (
        <button className="button-friends" onClick={onClick}>
            {buttonText}
        </button>
    );
}



  