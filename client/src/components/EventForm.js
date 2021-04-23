import { useState } from "react";

export default function EventForm({ onFormSubmit }) {
    const [date, setDate] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        //console.log(date);
        onFormSubmit(date);
    };
    const onChange = (event) => {
        event.preventDefault();
        setDate(event.target.value);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    value={date}
                    required
                    onChange={onChange}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

/*
 onChange={(event) => setDate(event.target.value)}

*/
