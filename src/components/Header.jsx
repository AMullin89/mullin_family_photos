import './Header.css';

export default function Header({isUserSignedIn, handleShowUpload}){

    function openUpload(){
        handleShowUpload()
    }


    return (
        <header id="header-main">
            <h1 id="title-main">Mullin Family Photos</h1>
            {isUserSignedIn &&
            <div>
                <div>
                    <ul id="nav">
                        <li onClick={openUpload}>Upload</li>
                        <li>Sign Out</li>
                    </ul>
                </div>
            </div>}
        </header>
    )
};