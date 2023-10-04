import React from 'react';
import { Link } from 'react-router-dom'
import addressIcon from '../../_assets/location.png'
import phoneIcon from '../../_assets/telephone.png'
import globeIcon from '../../_assets/world-wide-web.png'
import mapsIcon from '../../_assets/google-maps.png'

const ResultRow = (props) => {
  const {
    name,
    formatted_address,
    formatted_phone_number,
    website,
    url,
    price_level,
    opening_hours,
  } = props.result;

  const saveIt = async (name,formatted_address) => {
    try{
        console.log("in saveIt Function...!")
        let dataBody = {
            email: localStorage.email,
            location: name ,
            address: formatted_address
        };
        console.log("databody" + dataBody.email)
        console.log("databody" + dataBody.location)
        console.log("databody" + dataBody.address)
        await fetch('/api/saveLoc', 
        {method: 'POST',
            body: JSON.stringify(dataBody),
            headers: {
            "Content-Type": "application/json",
            },})
            .then((res) => res.json())
            .then((data) => console.log(data));
    }catch{
        console.log("error in the saveItfunction")
    }
   
}

  return (
    <div
      className='collapse show bg-base-200'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        margin: '20px 20px 20px 20px',
        width: '70%',
      }}
    >
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>{name}</div>
      <button className="btn sm:btn-sm" style={{'background-color':'#2B4450'}} onClick = {() => saveIt(name,formatted_address)}>Save</button>
      <div className='collapse-content'>
        <div className='resultRow'>
          <img className='resultIcon' src={addressIcon}></img>
          <p>{formatted_address}</p>
        </div>
        <div className='resultRow'>
          <img className='resultIcon' src={phoneIcon}></img>
          <p>{formatted_phone_number}</p>
        </div>
        <div className='resultRow'>
          <img className='resultIcon' src={globeIcon}></img>
          <p className='link'><Link to={website}>Website</Link></p>
        </div>
        <div className='resultRow'>
          <img className='resultIcon' src={mapsIcon}></img>
          <p className='link'><Link to={url}>Maps</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ResultRow;
