import React from 'react';
import image404 from './jpg/404.png';

const PageNotFound = () => {
    return (
        <div style={{
            textAlign: 'center',
        }}>
            <img src={image404} alt="404 page not found" style={{
            width: '400px',
        }}/>
            <h3>This page could not be found</h3>
            <button onClick={() => window.history.back()} className="form-button" style={{
                marginLeft: '50%',
                transform: "translate(-50%)"
            }}>Go back</button>
        </div >
    )
}

export default PageNotFound