const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { compare } = require("bcryptjs");
//const cryptoRandomString = require("crypto-random-string");
const { uploader } = require("../upload");
const { s3upload } = require("../s3");

const {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserProfile,
    updateUserBio,
    getMatchingBooks,
    getBookById,
    getEventsByBook,
    createEvent,
    getAttendance,
    createAttendance,
    deleteAttendance,
    getAttendingEvents,
} = require("./db");

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());
app.use(
    cookieSession({
        secret: "Steinbeck",
        maxAge: 24 * 60 * 60 * 1000,
    })
);

// csrf middleware
app.use(csurf());
app.use(function (request, response, next) {
    response.cookie("mytoken", request.csrfToken());
    next();
});

//body parser
app.use(
    express.urlencoded({
        extended: false,
    })
);

/* ----- REGISTRATION ------ */
app.post("/users", (request, response) => {
    createUser({ ...request.body })
        .then((newUserId) => {
            console.log("new USER", newUserId);
            console.log("requestBODY", request.body);

            request.session.userId = newUserId;
            response.json({
                message: "success",
                user_id: newUserId,
            });
        })
        .catch((error) => {
            if (error.constraint === "users_email_key") {
                response.statusCode = 401;
                console.log("[social:express] POST /users", error);
                response.json({
                    message: "This email is already taken, try to log in.",
                });
                return;
            }
            response.statusCode = 400;
            console.log("[social:express] POST /users error general", error);
            response.json({
                message: "Something went wrong, please try again.",
            });
        });
});

app.post("/login", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    let error;
    if (!email || !password) {
        response.statusCode = 400;
        console.log("[login] POST /login error email or password", error);
        response.json({
            message: "Something went wrong, please try again.",
        });
        return;
    } else {
        getUserByEmail(email).then((user) => {
            if (!user) {
                response.statusCode = 400;
                console.log("[login] error", error);
                response.json({
                    message: "Something went wrong, please try again.",
                });
                return;
            }
            compare(password, user.password_hash).then((match) => {
                if (!match) {
                    response.statusCode = 400;
                    console.log("[match] error", error);
                    response.json({
                        message: "Something went wrong, please try again.",
                    });
                    return;
                }
                request.session.userId = user.id;
                response.statusCode = 200;
                response.json({
                    message: "success",
                    user_id: user.id,
                });
            });
        });
    }
});

app.get("/user", (request, response) => {
    const { userId } = request.session;

    getUserById({ userId })
        .then((result) => {
            console.log("GET USER BY ID", result);
            // response.statusCode = 200;
            response.json({ result });
        })
        .catch((error) => console.log("GET: users by Id", error));
});

/*--- UPLOAD PIC ---*/

app.post(
    "/upload_picture",
    uploader.single("file"),
    s3upload,
    (request, response) => {
        const { userId } = request.session;
        const profilePicURL = `https://s3.amazonaws.com/spicedling/${request.file.filename}`;

        console.log(
            "[server: updateUserProfile] profilePicURL:",
            profilePicURL
        );

        updateUserProfile({ userId, profilePicURL })
            .then(() => {
                response.json({ profilePicURL });
                // console.log("PROFILEPIC", profilePicURL);
            })
            .catch((error) => {
                response.statusCode = 500;
                console.log("[Upload Picture] error", error);
            });
    }
);

/*--- UPDATE BIO---*/

app.put("/user", (request, response) => {
    const { userId } = request.session;
    const { newBio } = request.body;
    console.log("userId", userId);
    console.log("newBio", newBio);

    updateUserBio({ userId, newBio })
        .then(() => {
            response.json({ newBio });
        })
        .catch((error) => {
            response.statusCode = 500;
            console.log("[PUT] update BIO", error);
        });
});

/* ---- FIND/SEARCH BOOKS ----*/

app.get("/api/search", (request, response) => {
    const { q } = request.query;
    console.log("get, books, val", q);

    if (!q) {
        response.statusCode = 400;
        response.json({
            message: "Some value needed",
        });
        return;
    }

    getMatchingBooks(q).then((result) => {
        if (!result) {
            response.statusCode = 404;
            response.json({
                message: "No results",
            });
            return;
        }
        response.json({ result });
    });
    /* .catch((error) => {
            response.statusCode = 500;
            console.log("server [GET] users/most-recent", error);
        }); */
});

/*---- BOOK PROFILE ----*/

app.get("/api/books/:id", (request, response) => {
    const { id } = request.params;
    console.log("BOOKS, ID", id);

    getBookById({ id })
        .then((book) => {
            if (!book) {
                response.statusCode = 404;
                response.json({
                    message: "book not found",
                });
                return;
            }
            console.log("[books/:id] GET BOOK BY ID", book);
            getEventsByBook({ id }).then((events) => {
                response.json({
                    ...book,
                    events,
                });
            });
        })
        .catch((error) => console.log("GET: books by Id", error));
});

/*------ CREATE EVENT -------*/

app.post("/api/books/:id/events", (request, response) => {
    const bookId = request.params.id;
    const { date } = request.body;
    const creator = request.session.userId;

    createEvent({ bookId, creator, date })
        .then((newEvent) => {
            getUserById({ userId: creator }).then((user) => {
                response.json({
                    ...newEvent,
                    event_id: newEvent.id,
                    first: user.first,
                    last: user.last,
                });
            });
        })
        .catch((error) => console.log("GET: books by Id", error));
});

/*---- ATTENDANCE -----*/

app.get("/api/books/:id/events/:event_id/attendance", (request, response) => {
    const userId = request.session.userId;
    const eventId = request.params.event_id;
    console.log("SERVER, app.get", userId);

    getAttendance(userId, eventId)
        .then((result) => {
            if (!result) {
                response.statusCode = 404;
                response.json({
                    message: `No attendance`,
                });
                return;
            }
            response.json(result);
        })
        .catch((error) => console.log("server[app.get]: error", error));
});

app.post("/api/books/:id/events/:event_id/attendance", (request, response) => {
    const userId = request.session.userId;
    const eventId = request.params.event_id;
    const attendance = true;

    console.log("SERVER, app.post", userId, eventId, attendance);

    createAttendance(userId, eventId, attendance)
        .then((attendance) => {
            response.json(attendance);
        })
        .catch((error) => console.log("server[app.post]: error", error));
});

app.delete(
    "/api/books/:id/events/:event_id/attendance",
    (request, response) => {
        const userId = request.session.userId;

        deleteAttendance(userId) // eventId?
            .then(() => {
                response.json({ messsage: "no attendance" });
            })
            .catch((error) => console.log("server[app.delete]: error", error));
    }
);

/* ----------- ATTENDANCE LIST ---------------*/

app.get("/api/user/my-event", (request, response) => {
    const userId = request.session.userId;
    const eventId = request.params.event_id;
    const attendance = true;

    getAttendingEvents(userId, eventId, attendance).then((result) => {
        response.json(result);
    });
});

/*
  if (attendance === false) {
            response.json({ message: "no events yet" });
            return;
*/
app.get("/welcome", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
        return;
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("*", function (request, response) {
    if (!request.session.userId) {
        response.redirect("/welcome");
        return;
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
