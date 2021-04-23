import { useState } from "react";

export default function EventForm() {
    const [date, setDate] = useState("");
    return (
        <form>
            <label>
                Date:
                <input type="date" name="date" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
