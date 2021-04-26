import AttendingButton from "./AttendingButton";
import { Link } from "react-router-dom";

function formatDate(date) {
    console.log("date", date);
    const dateObject = new Date(date);
    const newDate = dateObject.toLocaleDateString("de-DE");
    return newDate;
}

function formatTime(time) {
    const timeObject = new Date(`August 19, 1975 ${time} GMT+00:00`);
    console.log("dateObject", timeObject);
    const newTime = timeObject.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    console.log("newTime", newTime);
    console.log("newTime", typeof newTime);

    return newTime.split(":").slice(0, 2).join(":");
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
            console.log("creator", event.creator_id);
            return (
                <article className="event-info" key={event.event_id}>
                    <p className="event-date">
                        MeetUp: {formatDate(event.event_date)}
                    </p>
                    <p className="event-time">
                        Starts: {formatTime(event.event_time)}
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

/*
<Link to="{event.creator_id}">

*/
