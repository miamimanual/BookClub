import { useState } from "react";

export default function EventForm({ onFormSubmit }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        onFormSubmit({ date, time });
    };
    const onChangeDate = (event) => {
        setDate(event.target.value);
    };

    const onChangeTime = (event) => {
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
                    onChange={onChangeDate}
                />
                <br></br>
                <span>
                    Time:{" "}
                    <input
                        type="time"
                        name="time"
                        value={time}
                        required
                        onChange={onChangeTime}
                    />
                </span>
            </label>
            <input
                className="button-general general-position"
                type="submit"
                value="Submit"
            />
        </form>
    );
}

/*
 onChange={(event) => setDate(event.target.value)}

*/
