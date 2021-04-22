export default function EventList({ events }) {
    console.log("EVENTS", events);
    function renderButton() {
        return <button>Create Event</button>;
    }

    function renderList() {
        return <div>List of the Events</div>;
    }

    return events.length ? renderList() : renderButton();
}
