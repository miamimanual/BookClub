import AttendingButton from "./AttendingButton";

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
    onAttendingtoEvent,
}) {
    console.log("EVENTS", events);

    function renderButton() {
        return <button onClick={onNewEventClick}>Create Event</button>;
    }

    function renderList() {
        return events.map((event) => {
            return (
                <article key={event.event_id}>
                    <p>Event Date: {formatDate(event.event_date)}</p>
                    <br></br>
                    created by: {event.first} {event.last}
                    <p>
                        <AttendingButton
                            bookId={bookId}
                            eventId={event.event_id}
                            onAttendingtoEvent={onAttendingtoEvent}
                        />
                    </p>
                </article>
            );
        });
    }

    /*
        if (events.length === 0) {
            renderButton();
        }

        axios.post(`/api/books/:id/events`).then((response) => {
            console.log("AXIOS, eventList", response);
            setMeetup(response.data.newEvent);
        }, []);
    }); */

    return events.length ? renderList() : renderButton();
}
