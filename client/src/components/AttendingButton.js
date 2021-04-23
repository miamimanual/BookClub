import axios from "axios";
import { useState, useEffect } from "react";

export default function AttendingButton({ bookId, eventId }) {
    const [buttonText, setButtonText] = useState("Attending");
    const [attending, setAttending] = useState(false);
    const [notAttending, setNotAttending] = useState(false);

    useEffect(() => {}, [id]);
}
