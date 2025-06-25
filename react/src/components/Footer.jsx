import React from 'react';

const Footer = (props) => {
    return (
        <footer className="text-muted">
            <div><strong>{props.environment.toUpperCase()}</strong></div>
        </footer>
    );
};

export default Footer;