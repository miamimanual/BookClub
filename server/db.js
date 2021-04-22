const spicedPg = require("spiced-pg");
const { genSalt, hash: bcryptHash } = require("bcryptjs");

function hash(password) {
    return genSalt().then((salt) => bcryptHash(password, salt));
}

const database = process.env.DB || "bookclub";

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { username, password } = require("../credentials.json");
    return `postgres:${username}:${password}@localhost:5432/${database}`;
}

const db = spicedPg(getDatabaseURL());
console.log(`[db] Connecting to: ${database}`);

function createUser({ firstName, lastName, email, password }) {
    return hash(password).then((password_hash) =>
        db
            .query(
                "INSERT INTO users (first, last, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id",
                [firstName, lastName, email, password_hash]
            )
            .then((result) => result.rows[0].id)
    );
}

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0]);
}

function getUserById({ userId }) {
    return db
        .query(
            "SELECT first, last, email, profile_url, bio FROM users WHERE id = $1",
            [userId]
        )
        .then((result) => result.rows[0]);
}

function updateUserProfile({ userId, profilePicURL }) {
    return db.query("UPDATE users SET profile_url = $2 WHERE id = $1", [
        userId,
        profilePicURL,
    ]);
}

function updateUserBio({ userId, newBio }) {
    return db.query("UPDATE users SET bio = $2 WHERE id = $1", [
        userId,
        newBio,
    ]);
}

function getMatchingBooks(val) {
    return db
        .query(
            `SELECT books.id, title, cover_url, name, year
            FROM books 
            JOIN authors
            ON author_id = authors.id
            WHERE title ILIKE $1 OR authors.name ILIKE $1;`,
            ["%" + val + "%"]
        )
        .then((result) => result.rows); // [0]
}

function getBookById({ id }) {
    return db
        .query(
            `SELECT books.id, title, year, cover_url, name, description 
            FROM books 
            JOIN authors 
            ON author_id = authors.id 
            WHERE books.id = $1`,
            [id]
        )
        .then((result) => result.rows[0]);
}

/*
function getAttendance() {
    return db
        .query(
            `SELECT books.id, title, year, cover_url, name, description
        FROM attendance
        JOIN books
        ON author_id = authors.id`
        )
        .then((result) => result.row[0]);
}
*/

function getEventsByBook({ id }) {
    return db
        .query(
            `SELECT book_id, creator_id, event_date, first, last 
            FROM events 
            JOIN users
            ON creator_id = users.id
            WHERE book_id = $1`,
            [id]
        )
        .then((result) => result.rows);
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserProfile,
    updateUserBio,
    getMatchingBooks,
    getBookById,
    getEventsByBook,
};
