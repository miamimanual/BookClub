import { useState } from "react";

export default function EventForm() {
    const [date, setDate] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(date);
    };
    /*
    onSubmit() {
        event.preventDefault();
        console.log(date);
    } */

    return (
        <form onSubmit={onSubmit}>
            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    value={date}
                    required
                    onChange={(event) => setDate(event.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
