import axios from "../axios";
import { Link } from "react-router-dom";
import { getBookCoverById } from "../lib";

export default function MyEvents({ events, onEventResponse }) {
    function onButtonClick(eventId) {
        console.log("eventId", eventId);
        axios.delete(`/api/events/${eventId}/attendance`).then(() => {
            onEventResponse();
        });
    }

    return events.map((event) => {
        console.log("MYE event", event);

        return (
            <div className="my-events-box" key={event.event_id}>
                <div className="my-events-book-cover">
                    <Link to={"/books/" + event.book_id}>
                        <img
                            className="book-cover"
                            src={getBookCoverById(event.book_id)}
                        ></img>
                    </Link>
                </div>
                <div className="my-events-result-content my-events-book-info">
                    <Link to={"/books/" + event.book_id}>
                        {event.title} ({event.year})
                    </Link>
                    <span className="author-name">by {event.name}</span>
                    <button
                        className="my-events-button"
                        onClick={() => onButtonClick(event.event_id)}
                    >
                        I am not Attending
                    </button>
                </div>
            </div>
        );
    });
}

/*
target="_blank"
*/
