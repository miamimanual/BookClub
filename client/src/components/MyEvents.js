import axios from "../axios";
import { Link } from "react-router-dom";

export default function MyEvents({ events, onEventResponse, eventId }) {
    // const [buttonText, setButtonText] = useState("Attending");

    function onButtonClick(eventId) {
        axios.get("/api/user/my-event").then((response) => {
            onEventResponse();
            this.setState({
                ...this.state,
                userEvents: response.data,
            });
        });
    }

    return events.map((event) => {
        return (
            <div key={event.events.id}>
                <Link to={"/user/" + event.events.id} target="_blank">
                    <img className="book-cover" src={event.cover}></img>
                    {event.events.name}{" "}
                </Link>
                <button onButtonClick={() => onEventResponse(eventId)}>
                    {buttonText}
                </button>
            </div>
        );
    });
}

/*
export default function MyEvents(events,
    onEventResponse) {
    const [acceptedEvents, setAcceptedEvents] = useState([]);

    function onButtonClick(eventId) {
        axios.delete(...).then((
            onEventCancel(); 
        ));
    }
    // inside every event element you will have a button:
    // <button onButtonClick={() => onEventCancel(eventId)}>...</button>

    useEffect(() => {
        axios
            .get(`/api/user/my-event`)
            .then((response) => {
                setAcceptedFriends(response);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log("[Events], axios.get: error 404", error);
                    return;
                }
                console.log("[Events], axios.get: generic error", error);
            });
    }, []);

    function onClick(eventId) {
        if (accepted) {
            axios.delete(`/api/user/my-event`).then(() => {
                const updatedCanceled = acceptedFriends.filter(
                    (acceptedFriend) => acceptedFriend.user.id !== id
                );
                setAcceptedFriends(updatedCanceled);
            });
            return;
        }
        axios.put(`/friendships/${id}`, { accepted: true }).then((response) => {
            console.log("[Friends] onCLick response", response);
            const updatedIncoming = incomingFriends.filter(
                (incomingFriend) => incomingFriend.user.id !== id
            );
            const acceptedFriendship = incomingFriends.find(
                (incomingFriend) => incomingFriend.user.id === id
            );
            acceptedFriendship.accepted = true;

            setIncomingFriends(updatedIncoming); // soll gemacht werden, wenn der axios-call erfolgreich war!
            setAcceptedFriends([...acceptedFriends, acceptedFriendship]); // weil .find() kein array zurück bringt
        });
    }

    return (
        <section className="position-friends">
                <h3>Your current events</h3>
                <ul>
                    {acceptedEvents.map((acceptedEvent) => {
                        return (
                            <div key={acceptedEvent.events.id}>
                                <Link
                                    to={"/user/" + acceptedEvent.events.id}
                                    target="_blank"
                                >
                                    <img
                                        className="find-people-img"
                                        src={acceptedEvent.cover}
                                    ></img>
                                    {acceptedEvent.events.name}{" "}
                                </Link>
                                <button
                                    className="button-friends"
                                    onClick={() =>
                                        onClick(
                                            acceptedFriend.user.id,
                                            acceptedFriend.accepted
                                        )
                                    }
                                >
                                    Cancel Event
                                </button>
                            </div>
                        );
                    })}
                </ul>
            </section>
    );










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
