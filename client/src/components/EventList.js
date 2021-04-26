import AttendingButton from "./AttendingButton";
import { Link } from "react-router-dom";

function formatDate(date) {
    console.log("date", date);
    const dateObject = new Date(date);
    const newDate = dateObject.toLocaleDateString("de-DE");
    return newDate;
}

export default function EventList({
    events,
    onNewEventClick,
    bookId,
    onEventResponse,
}) {
    console.log("EVENTS", events);

    function renderButton() {
        return (
            <button
                className="button-general button-create-event"
                onClick={onNewEventClick}
            >
                Create Event
            </button>
        );
    }

    function renderList() {
        return events.map((event) => {
            return (
                <article className="event-info" key={event.event_id}>
                    <p className="event-date">
                        Event Date: {formatDate(event.event_date)}
                    </p>
                    <Link to="/">
                        created by: {event.first} {event.last}
                    </Link>

                    <p>
                        <AttendingButton
                            bookId={bookId}
                            eventId={event.event_id}
                            onEventResponse={onEventResponse}
                        />
                    </p>
                </article>
            );
        });
    }

    return events.length ? renderList() : renderButton();
}
