import React from 'react';

const Promo = (props) => {
    return (
        <div className="card" style={{gap: "20px", padding: "20px" }}>
            <div className="card bg-light">
                <div className="card-text">{props.data.feature}</div>
                <div className="card-text"><a href="#">Click to buy!</a></div>
            </div>
        </div>
    );
};

export default Promo;