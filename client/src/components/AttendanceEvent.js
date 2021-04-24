import { useEffect } from "react";

function attendance(userEvents = []) {
    const attending = [];
    const notAttending = [];

    userEvents.forEach((userEvent) => {
        if (userEvent.attending) {
            attending.push(userEvent);
        } else if (!userEvent.attending) {
            notAttending.push(userEvent);
        }
    });
    return [attending, notAttending];
}
/*
export default function AttendanceEvent() {
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [notAttendingEvents, setnotAttendingEvents] = useState([]);

    // useEffect(() => );
}
*/
