import { Component } from "react";
//import ProfilePicture from "./ProfilePicture";
import axios from "../axios";
//import FriendButton from "./FriendButton"; // attenting button
import { getBookCoverById } from "../lib";

class BookProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {
                // user
                title: "",
                year: "",
                name: "",
                cover: "",
                // bio: "",
            },
        };
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
                        title: response.data.result.title,
                        name: response.data.result.name,
                        year: response.data.result.year,
                        cover: getBookCoverById(response.data.result.id),
                        //`/covers/${response.data.result.id}.jpg`,
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

    render() {
        const { title, name, year, cover } = this.state.book;
        return (
            <section className="profile">
                <h2>{title}</h2>
                <div className="sidebar-profile-pic">
                    <img src={cover}></img>
                </div>
                <div className="sidebar-content">
                    {name} ({year})
                </div>
            </section>
        );
    }
}

export default BookProfile;

/*
                    <ProfilePicture />

                  <p> {bio || "No bio yet"}</p>
                <FriendButton id={this.props.id} />

*/
