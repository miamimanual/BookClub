import { useState } from "react";

export default function EventForm({ onFormSubmit }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(date);
        onFormSubmit(time);
    };
    const onChange = (event) => {
        event.preventDefault();
        setDate(event.target.value);
        setTime(event.target.value);
    };

    return (
        <form className="event-form" onSubmit={onSubmit}>
            <label>
                Date:{" "}
                <input
                    className="date"
                    type="date"
                    name="date"
                    value={date}
                    required
                    onChange={onChange}
                />
                <br></br>
                <span>
                    Time:{" "}
                    <input
                        type="time"
                        name="time"
                        value={time}
                        required
                        onChange={onChange}
                    />
                </span>
            </label>
            <br></br>
            <input
                className="button-general button-create-event"
                type="submit"
                value="Submit"
            />
        </form>
    );
}

/*
 onChange={(event) => setDate(event.target.value)}

*/
