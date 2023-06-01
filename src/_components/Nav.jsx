import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <NavLink exact to="/product" className="nav-item nav-link">Product</NavLink>
                        <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                        <NavLink exact to="/account/login" className="nav-item nav-link">Login</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <NavLink exact to="/product" className="nav-item nav-link">Product</NavLink>
                        <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                        {user.role === Role.Admin &&
                            <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                        }
                        <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                        <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 