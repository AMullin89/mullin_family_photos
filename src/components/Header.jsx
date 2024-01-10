import './Header.css';

export default function Header({isUserSignedIn, handleShowUpload, handleSignOut, handleShowMessages}){

    function openUpload(){
        handleShowUpload()
    }

    function signOut(){
        handleSignOut();
    }


    return (
        <header id="header-main">
            <h1 id="title-main">Mullin Family Photos</h1>
            {isUserSignedIn &&
            <div>
                <div>
                    <ul id="nav">
                        <li onClick={openUpload}>Upload</li>
                        <li onClick={handleShowMessages}>Messages</li>
                        <li onClick={signOut}>Sign Out</li>
                    </ul>
                </div>
            </div>}
        </header>
    )
};