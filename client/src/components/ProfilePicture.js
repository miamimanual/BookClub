const defaultProfilePic = "/monster.png";

function ProfilePicture({ firstName, lastName, profilePicURL, onClick }) {
    const src = profilePicURL || defaultProfilePic;
    return (
        <img
            className="profile-picture"
            src={src}
            alt={(firstName, lastName)}
            onClick={onClick}
        />
    );
}

export default ProfilePicture;
