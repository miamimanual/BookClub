import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBookCoverById } from "../lib";

//const DEFAULT_COVER = "https://via.placeholder.com/200x300";

export default function SearchBooks() {
    //  const [recentUsers, setRecentUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState([]);

    /*  useEffect(() => {
        axios.get("/users/most-recent").then((response) => {
            setRecentUsers(response.data.result);
        });
    }, []); */

    useEffect(() => {
        if (searchTerm.length <= 0) {
            return;
        }

        axios.get(`/api/search?q=${searchTerm}`).then((response) => {
            console.log("AXIOS, find people, response", response);
            setSearch(response.data.result);
        });
    }, [searchTerm]);

    function onChange(event) {
        setSearchTerm(event.target.value);
    }

    /*
    <Link to={"/books/" + element.id}>
                                <img
                                    className="find-people-img"
                                    src={`/covers/${element.id}.jpg`}
                                    alt={element.title}
                                ></img>
                            </Link>
    */

    return (
        <section className="find-people general-position">
            <h2>Find your favourite book</h2>
            <section>
                <h4>Search for a book or an author</h4>
                <p>
                    <input
                        className="input"
                        type="text"
                        placeholder="Search"
                        onChange={onChange}
                    />
                </p>
                <ul className="list result-list">
                    {search.map((element) => (
                        <li key={element.id}>
                            <Link to={"/books/" + element.id}>
                                <img
                                    className="find-people-img"
                                    src={getBookCoverById(element.id)}
                                    alt={element.title}
                                ></img>
                            </Link>
                            <div className="result-content">
                                <Link to={"/books/" + element.id}>
                                    {element.title} ({element.year})
                                </Link>

                                <span className="author-name">
                                    by {element.name}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}

/*            

<section>
                                    src={element.cover_url || DEFAULT_COVER}

                <h3>Who is new?</h3>
                <ul className="list">
                    {recentUsers.map((recentUser) => (
                        <li key={recentUser.id}>
                            <Link to={"/user/" + recentUser.id} target="_blank">
                                <img
                                    className="find-people-img"
                                    src={recentUser.profile_url}
                                    // alt={recentUser.first}
                                ></img>
                                <div className="find-people-name">
                                    {" "}
                                    {recentUser.first} {recentUser.last}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>*/
