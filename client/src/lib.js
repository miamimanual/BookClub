export function getBookCoverById(id) {
    return `/covers/${id}.jpg`;
}

/*
useEffect(() => {
        console.log("axios, get, id", id);
        axios
            .get(`/api/books/${this.props.id}/attending`)
            .then((response) => {
                console.log("[AttendingButton], axios", response);
                setAttending(true);
                // setNotAttending(response.data.accepted);
                console.log(
                    "[AttendingButton] axios.get, response.data.sender_id/ id ",
                    response.data.sender_id,
                    id
                );
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log("[FriendButton], axios.get: error", error);
                    return;
                }
                console.log(
                    "[AttendingButton], axios.get: generic error",
                    error
                );
            });
    }, [id]);

    useEffect(() => {
        if (!attending || notAttending) {
            setButtonText("Attending");
            return;
        }
        if (attending) {
            setButtonText("Not Attending");
            return;
        }
        setButtonText("Attending"); //
    }, [attending, notAttending]);

    function onClick() {
        if (!attending) {
            axios.post("/attending", { recipient_id: id }).then((response) => {
                console.log(
                    "[AttendingButton]: onClick: axios.post",
                    response.data
                );
                setAttending(true);
                setNotAttending(false);
            });
            return;
        }
        if (attending) {
            axios.delete(`/attending/${id}`).then(() => {
                console.log("[AttendingButton]: onCLick: axios.put");
                setAttending(false);
                setNotAttending(false);
            });
            return;
        }

        axios.delete(`/attending/${id}`).then(() => {
            console.log("[AttendingButton]: onCLick: axios.put");
            setAttending(false);
            setNotAttending(false);
        });
    }

    return (
        <button className="button-friends" onClick={onClick}>
            {buttonText}
        </button>
    ); */
