import { Component } from "react";
import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import ProfilePicture from "./ProfilePicture";
import ProfilePictureUploader from "./ProfilePictureUploader";
import Profile from "./Profile";
import BookProfile from "./BookProfile";
import SearchBooks from "./SearchBooks";
//import Friends from "./Friends";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                profilePicURL: "",
                bio: "",
            },
            userEvents: [],
            showModal: false,
        };
        // bind things!
        this.onProfilePictureClick = this.onProfilePictureClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onSaveBio = this.onSaveBio.bind(this);
        this.onEventResponse = this.onEventResponse.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("[App] axios success", response.data);
            this.setState({
                ...this.state,
                user: {
                    firstName: response.data.result.first,
                    lastName: response.data.result.last,
                    profilePicURL: response.data.result.profile_url,
                    bio: response.data.result.bio,
                },
            });
        });
        axios.get("/api/user/my-event").then((response) => {
            this.setState({
                ...this.state,
                userEvents: response.data,
            });
        });
    }

    onProfilePictureClick() {
        this.setState({
            showModal: true,
        });
    }

    onUpload(profilePicURL) {
        this.setState({
            user: {
                ...this.state.user,
                profilePicURL,
            },
            showModal: false,
        });
    }

    onModalClose() {
        this.setState({
            showModal: false,
        });
    }

    onSaveBio(newBio) {
        console.log("[Bio] onSaveBio", newBio);

        axios
            .put("/user", { newBio })
            .then(() => {
                this.setState({
                    user: {
                        ...this.state.user,
                        bio: newBio,
                    },
                });
            })
            .catch((error) => {
                console.log("[App] saving new bio error", error);
            });
    }

    onEventResponse() {
        axios.get("/api/user/my-event").then((response) => {
            this.setState({
                ...this.state,
                userEvents: response.data,
            });
        });
    }

    render() {
        const logo = "/book_logo4.jpg"; // how to get a pic? require('/images/image-name.png')
        const src = logo;

        return (
            <BrowserRouter>
                <section className="app">
                    <header>
                        <img className="logo" src={src} alt="logo" />

                        <Link className="position-header" to="/search">
                            Search
                        </Link>

                        <Link to="/">
                            <ProfilePicture
                                firstName={this.state.user.firstName}
                                lastName={this.state.user.lastName}
                                profilePicURL={this.state.user.profilePicURL}
                                //onClick={this.onProfilePictureClick}
                            />
                        </Link>
                    </header>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                firstName={this.state.user.firstName}
                                lastName={this.state.user.lastName}
                                profilePicURL={this.state.user.profilePicURL}
                                onClick={this.onProfilePictureClick}
                                bio={this.state.user.bio}
                                onSaveBio={this.onSaveBio}
                            />
                        )}
                    />
                    <Route path="/other">other</Route>
                    <Route path="/search" render={() => <SearchBooks />} />
                    <Route
                        path="/books/:id"
                        render={(props) => (
                            <BookProfile
                                id={parseInt(props.match.params.id)}
                                key={props.match.url}
                                history={props.history}
                                onEventResponse={this.onEventResponse}
                            />
                        )}
                    />
                    <div className="app-modal"> {this.renderModal()}</div>
                </section>
            </BrowserRouter>
        );
    }

    renderModal() {
        if (this.state.showModal) {
            return (
                <ProfilePictureUploader
                    onUpload={this.onUpload}
                    onClose={this.onModalClose}
                />
            );
        }
        return null;
    }
}

export default App;

/*
     <Route path="/friends" render={() => <Friends />} />
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                id={parseInt(props.match.params.id)}
                                key={props.match.url}
                                history={props.history}
                            />
                        )}
 />
                    
                    
// Header links: 
<Link className="position-header" to="/">
Home </Link>

 <Link className="position-header" to="/friends">
                            Friends
                        </Link>
                    */
