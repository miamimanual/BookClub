/*

export default function MyEvents({ //this.state.userEvents
    events,
    onEventCancel
}) {
    function onButtonClick(eventId) {
        axios.delete(...).then((
            onEventCancel(); 
        ));
    }
    // inside every event element you will have a button:
    // <button onButtonClick={() => onEventCancel(eventId)}>...</button>
    return events.map(...);
}

*/

/*
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

export default function MyEvents(this.state.userEvents) {
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [notAttendingEvents, setnotAttendingEvents] = useState([]);

    useEffect(() => );
}
*/
