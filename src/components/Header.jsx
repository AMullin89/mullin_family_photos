import './Header.css';

export default function Header({isUserSignedIn, handleShowUpload, handleSignOut, handleShowMessages}){

    return (
        <header id="header-main">
            <h1 id="title-main">Mullin Family Photos</h1>
            {isUserSignedIn &&
            <div>
                <div>
                    <ul id="nav">
                        <li onClick={handleShowUpload}>Upload</li>
                        <li onClick={handleShowMessages}>Messages</li>
                        <li onClick={handleSignOut}>Sign Out</li>
                    </ul>
                </div>
            </div>}
        </header>
    )
};