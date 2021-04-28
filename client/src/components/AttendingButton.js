import axios from "../axios";
import { useState, useEffect } from "react";

export default function AttendingButton({ bookId, eventId, onEventResponse }) {
    console.log("ATTENDING-Button", bookId, eventId);
    const [buttonText, setButtonText] = useState("Attending");
    const [attending, setAttending] = useState(false);
    const [notAttending, setNotAttending] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/books/${bookId}/events/${eventId}/attendance`)
            .then((response) => {
                console.log("[AttendingButton], axios", response);
                setAttending(true); // true
                setNotAttending(); //?
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log("[AttendingButton], axios.get: error", error);
                    return;
                }
                console.log(
                    "[AttendingButton], axios.get: generic error",
                    error
                );
            });
    }, [bookId, eventId]);

    useEffect(() => {
        if (!attending || notAttending) {
            setButtonText("Attending");
            return;
        }
        if (attending) {
            setButtonText("Not Attending");
            return;
        }
        setButtonText("Attending"); //
    }, [attending, notAttending]);

    function onClick() {
        if (!attending) {
            axios
                .post(`/api/books/${bookId}/events/${eventId}/attendance`)
                .then((response) => {
                    console.log(
                        "[AttendingButton]: onClick: axios.post",
                        response
                    );
                    setAttending(true);
                    setNotAttending(false);
                    onEventResponse(eventId);
                });
            return;
        }
        if (attending) {
            axios.delete(`/api/events/${eventId}/attendance`).then(() => {
                console.log("[AttendingButton]: onCLick: axios.delte");
                setAttending(false);
                setNotAttending(false);
            });
            return;
        }

        axios // do I need it?
            .delete(`/api/events/${eventId}/attendance`)
            .then(() => {
                console.log("[AttendingButton]: onCLick: axios.delete");
                setAttending(false);
                setNotAttending(false);
            });
    }

    return (
        <button className="button-general" onClick={onClick}>
            {buttonText}
        </button>
    );
}
