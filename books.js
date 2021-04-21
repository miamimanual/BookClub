const fs = require("fs");
const path = require("path");
const output = path.join(__dirname, "insert-books.sql");

const authors = [
    "Stanisław Lem",
    "Henry Miller",
    "J.R.R. Tolkien",
    "Fyodor Dostoyevsky",
    "Gabriel Garcia Marquez",
    "Virginia Woolf",
    "Roberto Bolano",
];

const books = [
    {
        author_id: 1,
        title: "Solaris",
        year: 1962,
    },
    {
        author_id: 1,
        title: "Fiasko",
        year: 1979,
    },
    {
        author_id: 2,
        title: "Tropic of Cancer",
        year: 1934,
    },
    {
        author_id: 2,
        title: "Tropic of Capricorn",
        year: 1950,
    },
    {
        author_id: 2,
        title: "The smile at the foot of the ladder",
        year: 1948,
    },
    {
        author_id: 3,
        title: "The Hobbit",
        year: 1937,
    },
    {
        author_id: 3,
        title: "The Lord of the Rings",
        year: 1950,
    },
    {
        author_id: 4,
        title: "Crime and punishment",
        year: 1884,
    },
    {
        author_id: 4,
        title: "The Brothers Karamazov",
        year: 1880,
    },
    {
        author_id: 4,
        title: "White Nights",
        year: 1848,
    },
    {
        author_id: 5,
        title: "Cien años de soledad",
        year: 1967,
    },
    {
        author_id: 5,
        title: "El amor en los tiempos del cólera",
        year: 1985,
    },
    {
        author_id: 6,
        title: "Mrs Dalloway",
        year: 1925,
    },
    {
        author_id: 6,
        title: "To The Lighthouse",
        year: 1927,
    },
    {
        author_id: 7,
        title: "Los detectives salvajes",
        year: 1985,
    },
    {
        author_id: 7,
        title: "Nocturno de Chile",
        year: 2000,
    },
];

function generateQuery(book, author_id) {
    return `INSERT INTO books (author_id, title, year) VALUES (${author_id}, '${book.title}', ${book.year});`;
}

const sql = authors
    .map((author, index) =>
        [
            `INSERT INTO authors (name) VALUES ('${author}');`,
            books
                .filter(({ author_id }) => author_id === index + 1)
                .map((book) => generateQuery(book, index + 1)),
        ].flat()
    )
    .flat();

fs.writeFileSync(output, sql.join("\n"));
