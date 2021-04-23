import axios from "../axios";

export default function EventList({ events, onNewEventClick }) {
    console.log("EVENTS", events);

    function renderButton() {
        return <button onClick={onNewEventClick}>Create Event</button>;
    }
    function renderList() {
        return events.map((event) => {
            return <article key={event.event_id}>{event.first}</article>;
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
