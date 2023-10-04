import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate

const UserPage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [savedList, setSavedList] = useState([]);
  const [triedList, setTriedList] = useState([]);

  const email = localStorage.getItem('email')
  console.log('email :>> ', email);
  async function savedPlaces() {
    const response = await fetch('/api/getSaved', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ email}) // sending email in the body
  });

  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log('data :>> ', data);
  setSavedList(data.savedList);
  }

  // const response = await fetch('http://localhost:3000/api/getSaved', {
  //           method: "GET",
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ email: email }) // sending email in the body
  //       });

  //       if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log('data :>> ', data);


  useEffect(() => {
    savedPlaces();
  }, []);


  //generate rows for saved list
  const savedRows = savedList.map((savedPlace) => {
    return (
      <tr>
        <td>{savedPlace.location}</td>
        <td>{savedPlace.address}</td>
      </tr>
    );
  });
  //generate rows for tried list
  const triedRows = triedList.map((triedPlace) => {
    const name = triedPlace.name;
    const score = triedPlace.score;
    const tags = triedPlace.tags;
    return (
      <tr>
        <td>{name}</td>
        <td>{score}</td>
        <td>{tags}</td>
      </tr>
    );
  });


  return (
    <div className="bg-gradient-to-r from-blue-200"  style={{height: '100%', backgroundColor:"#DFEBED"}}> 
      <h1 className="font-primary text-8xl text-primary" style={{'textShadow': '2px 2px 10px gray'}}>VIBE</h1>
      <h2></h2>
      {/* add a button to navigate to the search page */}
      <div className='lists overflow-x-auto flex-col justify-center items-center'>
      <br />
      <br />
        <div className="collapse show bg-base-200 w-1/2" style={{'backgroundColor': 'rgba(0, 0, 0, 0.2)'}}>
          <input type="checkbox" /> 
          <div className="collapse-title text-2xl font-medium font-primary text-white text-center" style={{'textShadow': '1px 1px 2px black'}}>
             Saved Places!
          </div>
        <div className="collapse-content"> 
        <table className='SavedTable table table-zebra font-primary rounded-sm'  style={{'backgroundColor': 'rgba(0, 0, 0, 0.1)'}}>
            <thead>
              <tr>
                <th>Place</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {savedRows}
            </tbody>
          </table>
        </div>
        </div>
        <br />
        
        <br />
        <br />
      </div>
      <div className='searchButton'>
        <button className='button text-xl' style={{backgroundColor:"#2b4450"}} onClick={() => navigate('/search')}>Go to Search Page</button>
      </div>
    </div>
  );
};
export default UserPage;




{/* <tr>
              <th>Capital One Cafe</th>
            </tr>
            <tr>
              <th>Bean & Bean Chelsea</th>
            </tr>
            <tr>
              <th>Gregorys Coffee</th>
            </tr>
            <tr>
              <th>Variety Coffee Roasters</th>
            </tr>
            <tr>
              <th>King's Street Coffee</th>
            </tr> */}




            // <h2 className="font-primary text-2xl text-primary" style={{'textShadow': '1px 1px 2px gray'}}>**~ Where you've been ~**</h2>
            // <div>
            //   <table className='SavedTable table table-zebra font-primary'  style={{'backgroundColor': 'rgba(0, 0, 0, 0.1)'}}>
            //     <thead>
            //       <tr>
            //         <th><h4>Place</h4></th>
            //         <th><h4>Rating</h4></th>
            //         <th><h4>Tags</h4></th>
            //       </tr>
            //     </thead>
            //     <tbody>
            //       <tr>
            //         <th>Seven Grams Caffe</th>
            //         <th>4</th>
            //         <th>Chill</th>
            //       </tr>
            //       <tr>
            //         <th>Intelligentsia Coffee Highline Coffeebar</th>
            //         <th>4</th>
            //         <th>Quiet</th>
            //       </tr>
            //       <tr>
            //         <th>Stumptown Coffee Roasters</th>
            //         <th>3</th>
            //         <th>Chill</th>
            //       </tr>
            //       <tr>
            //         <th>Gregorys Coffee</th>
            //         <th>4</th>
            //         <th>Outlets</th>
            //       </tr>
            //       <tr>
            //         <th>Joe Coffee Company</th>
            //         <th>2</th>
            //         <th>Clean Bathroom</th>
            //       </tr>
            //     </tbody>
            //   </table>
    
            // </div>

        //     <div className="collapse show bg-base-200" style={{'backgroundColor': 'rgba(0, 0, 0, 0.2)'}}>
        //   <input type="checkbox" /> 
        //   <div className="collapse-title text-2xl font-medium font-primary text-white" style={{'textShadow': '1px 1px 2px black'}}>
        //   **~ Where you've been ~**
        //   </div>
        // <div className="collapse-content"> 
        // <table className='SavedTable table table-zebra font-primary rounded-sm'  style={{'backgroundColor': 'rgba(0, 0, 0, 0.1)'}}>
        // <thead>
        //       <tr>
        //         <th><h4>Place</h4></th>
        //         <th><h4>Rating</h4></th>
        //         <th><h4>Tags</h4></th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       <tr>
        //         <th>Seven Grams Caffe</th>
        //         <th>4</th>
        //         <th>Chill</th>
        //       </tr>
        //       <tr>
        //         <th>Intelligentsia Coffee Highline Coffeebar</th>
        //         <th>4</th>
        //         <th>Quiet</th>
        //       </tr>
        //       <tr>
        //         <th>Stumptown Coffee Roasters</th>
        //         <th>3</th>
        //         <th>Chill</th>
        //       </tr>
        //       <tr>
        //         <th>Gregorys Coffee</th>
        //         <th>4</th>
        //         <th>Outlets</th>
        //       </tr>
        //       <tr>
        //         <th>Joe Coffee Company</th>
        //         <th>2</th>
        //         <th>Clean Bathroom</th>
        //       </tr>
        //     </tbody>
        // </table>
        // </div>
        // </div>