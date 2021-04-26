import axios from "../axios";
import { Link } from "react-router-dom";
import { getBookCoverById } from "../lib";
//bookid

export default function MyEvents({ events, onEventResponse }) {
    console.log("MYE, events", events);
    //  const objEvents = Object.keys(events);
    // console.log("MYE arrayEvents", objEvents);

    function onButtonClick(eventId) {
        console.log("eventId", eventId);
        axios.delete(`/api/events/${eventId}/attendance`).then(() => {
            onEventResponse();
        });
    }

    return events.map((event) => {
        console.log("MYE event", event);
        //  const cover = getBookCoverById(events.book_id);
        //  const src = cover;
        return (
            <div key={event.event_id}>
                {console.log("MYE event, event[0]", event.event_id)}
                <Link to={"/books/" + event.book_id} target="_blank">
                    <img
                        className="book-cover"
                        src={getBookCoverById(event.book_id)}
                    ></img>
                </Link>
                <button onButtonClick={() => onButtonClick(event.event_id)}>
                    {console.log("MYE event, event.event_id", event.event_id)}I
                    am not Attending
                </button>
            </div>
        );
    });
}
