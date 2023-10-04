import React from 'react';
​
const saveComponent = (props) => {
    const { location, address } = props;
    
    return(
        <div className = "Saved List">
            <p>Location: {location} Address {address}</p>
        </div>
    )
}
​
export default saveComponent;