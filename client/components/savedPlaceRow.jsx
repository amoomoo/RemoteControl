import React from 'react';
import SaveComponent from 'client/components/UserPage.jsx'
​
const savedPlaceRow = (props) => {
    const {savedRows} = props;
    let savedRes = []
    for(let i = 0; i < savedRows.length; i++){
        savedRes.push(
        <SaveComponent
        location = {savedRows.location[i]}
        address = {savedRows.address[i]}
        />)
    }
​
    return (
        <div>
            {savedRes}
        </div>
    )
}