import { Component } from "react";

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            newBio: "",
        };

        this.editBio = this.editBio.bind(this);
        this.onTextareaInput = this.onTextareaInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        console.log("[BioEditor] onSubmit", this.state.newBio);
        this.props.onSaveBio(this.state.newBio);
        this.setState({ isEditing: false });
    }

    editBio() {
        this.setState({ isEditing: true });
    }

    onTextareaInput(event) {
        console.log("[BioEditor] event.target.value", event.target.value);
        console.log("[BioEditor] newBio", this.state.newBio);

        this.setState({
            [event.target.name]: event.target.value,
            newBio: event.target.value,
        });
    }

    render() {
        console.log("this.onInput", this.onInput);

        if (this.state.isEditing) {
            return (
                <form className="general-position" onSubmit={this.onSubmit}>
                    <textarea
                        className="textarea"
                        rows={3}
                        cols={30}
                        onInput={this.onTextareaInput}
                        defaultValue={this.props.bio}
                        required
                    />
                    <button className="button-general" type="submit">
                        Save Text
                    </button>
                </form>
            );
        } else {
            const bioText = this.props.bio ? this.props.bio : "No bio";
            const buttonText = this.props.bio ? "Edit Bio" : "Add Bio";
            return (
                <>
                    <p>{bioText}</p>
                    <button className="button-general" onClick={this.editBio}>
                        {buttonText}
                    </button>
                </>
            );
        }
    }
}

export default BioEditor;
