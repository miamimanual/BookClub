import { Component } from "react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import axios from "../axios";
import { getBookCoverById } from "../lib";

class BookProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {
                title: "",
                year: "",
                name: "",
                cover: "",
                events: [],
            },
            showCreateEventForm: false,
        };

        this.onNewEventClick = this.onNewEventClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        console.log(
            "bookProfile[componentDidMount]: this.props.id",
            this.props.id
        );
        axios
            .get(`/api/books/${this.props.id}`) // {this.props.id} {this.props.match.params.id}
            .then((response) =>
                this.setState({
                    book: {
                        title: response.data.title,
                        name: response.data.name,
                        year: response.data.year,
                        cover: getBookCoverById(response.data.id),
                        events: response.data.events,
                    },
                })
            )
            .catch((error) => {
                if (
                    error.response.status >= 400 &&
                    error.response.status < 500
                ) {
                    this.props.history.push("/");
                }
            });
    }

    onNewEventClick() {
        console.log("Hello");
        this.setState({
            ...this.state.book,
            showCreateEventForm: true,
        });
    }

    onFormSubmit(date) {
        console.log("DATE", date);

        axios
            .post(`/api/books/${this.props.id}/events`, { date })
            .then((response) => {
                const newBook = { ...this.state.book, events: [response.data] };
                this.setState({
                    book: newBook,
                });
            });
    }

    renderForm() {
        const { date } = this.state.book;
        return <EventForm date={date} onFormSubmit={this.onFormSubmit} />;
    }

    render() {
        const { title, name, year, cover, events } = this.state.book;
        const bookId = this.props.id;

        console.log("BOOK PROFILE, EVENTS", this.props);
        return (
            <section className="profile">
                <h2>{title}</h2>
                <div className="sidebar-profile-pic">
                    <img src={cover}></img>
                </div>
                <div className="sidebar-content">
                    {name} ({year})
                </div>
                <EventList
                    events={events}
                    onNewEventClick={this.onNewEventClick}
                    bookId={bookId}
                    onEventResponse={this.props.onEventResponse}
                />
                {this.state.showCreateEventForm && this.renderForm()}
            </section>
        );
    }
}

export default BookProfile;

/*

   /* this.setState({
            ...this.state.book,
            //  date,
            showCreateEventForm: false,

             <EventList events={events} />

                    <ProfilePicture />

                  <p> {bio || "No bio yet"}</p>
                <FriendButton id={this.props.id} />

*/
