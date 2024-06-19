import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../header/header.scss";

import Logo from "../../../public/img/argentBankLogo.png";
import User from "../../../public/img/user.svg";
import SignOut from "../../../public/img/logout.svg";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifiez l'état de connexion de l'utilisateur
        const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSignOut = () => {
        // Effacez le token lors de la déconnexion
        localStorage.removeItem('userToken');
        sessionStorage.removeItem('userToken');
        setIsAuthenticated(false);
    };

    return (
        <div className="containerNav">
            {/* Lien vers la page d'accueil avec le logo */}
            <Link to="/">
                <img src={Logo} alt="Argent Bank logo" className="mainNav_logo" />
            </Link>

            <div className="nav">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="navLink">
                            <img src={User} alt="User Icon" className="icon" />
                            <span>Profile</span>
                        </Link>
                        <button onClick={handleSignOut} className="navLink">
                            <img src={SignOut} alt="Sign Out Icon" className="icon" />
                            <span>Sign Out</span>
                        </button>
                    </>
                ) : (
                    <Link to="/sign-in" className="navLink">
                        <img src={User} alt="User Icon" className="icon" />
                        <span>Sign In</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
