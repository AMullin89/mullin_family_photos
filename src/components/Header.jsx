import './Header.css';

export default function Header({isUserSignedIn}){


    return (
        <header id="header-main">
            <h1 id="title-main">Mullin Family Photos</h1>
            {isUserSignedIn &&
            <div>
                <div>
                    <ul id="nav">
                        <li>Upload</li>
                        <li>Sign Out</li>
                    </ul>
                </div>
            </div>}
        </header>
    )
};