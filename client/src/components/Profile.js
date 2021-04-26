import ProfilePicture from "./ProfilePicture";
import BioEditor from "./BioEditor";

function Profile({
    firstName,
    lastName,
    profilePicURL,
    onClick,
    bio,
    onSaveBio,
}) {
    return (
        <section className="profile">
            <div className="sidebar-profile-pic">
                <ProfilePicture
                    firstName={firstName}
                    lastName={lastName}
                    profilePicURL={profilePicURL}
                    onClick={onClick}
                />
            </div>
            <div className="sidebar-content">
                <h3>
                    {firstName} {lastName}
                </h3>
                <BioEditor bio={bio} onSaveBio={onSaveBio} />
            </div>
        </section>
    );
}

export default Profile;

//
