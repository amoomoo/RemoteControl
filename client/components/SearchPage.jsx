import React, { useState, useEffect, useRef} from 'react';
import ReactSelect from 'react-select';
import ResultRow from './ResultRow.jsx';
import 'dotenv/config';

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [results, setResults] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  let longitude = 0;
  let latitude = 0;
  
  //success/failure callbacks and options for the geolocation API call
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
  };

  const failure = (error) => {
    console.log(error);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 8000,
    maximumAge: 0,
  };

  //geolocation API call
  navigator.geolocation.getCurrentPosition(success, failure, options);

  //handle change of user input in form
  const handleChange = (selectedOptions, actionMeta) => {
    if (actionMeta.name === 'categories') {
      const selectedValues = selectedOptions.map((option) => option.value);
      setCategories([...new Set(selectedValues)]);
    } else if (actionMeta.name === 'neighborhoods') {
      const selectedValues = selectedOptions.map((option) => option.value);
      setNeighborhoods([...new Set(selectedValues)]);
    }
  };

  //send server a request to query the places API for results
  const queryPlacesAPI = () => {
    let query = ``;
    if (isChecked) {
      query = `input=${encodeURIComponent(
        categories
      )}&location=${latitude},${longitude}`;
    } else {
      query = `input=${encodeURIComponent(
        `${categories} in ${neighborhoods}`
      )}`;
    }

    fetch(`/api/placeSearch?${query}`)
      .then((response) => response.json())
      .then((output) => {
        let newResults = [];
        for (let place of output) {
          let id = place.place_id;
          let reqQuery = `place_id=${id}`;
          newResults.push(
            fetch(`/api/placeDetails?${reqQuery}`).then((res) => res.json())
          );
        }
        return Promise.all(newResults);
      })
      .then((updates) => {
        console.log(updates);
        setResults(updates);
      })
      .catch((err) => console.log(err));
  };

  //list of options for the dropdowns in form
  const categoriesOptions = [
    { value: 'Brewery', label: 'Brewery' },
    { value: 'Cafe', label: 'Cafe' },
    { value: 'Library', label: 'Library' },
    { value: 'Park', label: 'Park' },
  ];

  //going to try to implement autocomplete search bar for this one instead
  const neighborhoodOptions = [
    { value: 'Battery Park City', label: 'Battery Park City' },
    { value: 'Chelsea', label: 'Chelsea' },
    { value: 'City Hall', label: 'City Hall' },
    { value: 'Clinton', label: 'Clinton' },
    { value: 'East Harlem', label: 'East Harlem' },
    { value: 'East Village', label: 'East Village' },
    { value: 'Gramercy Park', label: 'Gramercy Park' },
    { value: 'Hamilton Heights', label: 'Hamilton Heights' },
    { value: 'Harlem', label: 'Harlem' },
    { value: 'Hells Kitchen', label: 'Hells Kitchen' },
    { value: 'Lower East Side', label: 'Lower East Side' },
    { value: 'Meatpacking District', label: 'Meatpacking District' },
    { value: 'Midtown East', label: 'Midtown East' },
    { value: 'Midtown West', label: 'Midtown West' },
    { value: 'Morningside Heights', label: 'Morningside Heights' },
    { value: 'Murray Hill', label: 'Murray Hill' },
    { value: 'Noho/Soho', label: 'Noho/Soho' },
    { value: 'Theater District', label: 'Theater District' },
    { value: 'Tribeca', label: 'Tribeca' },
    { value: 'Upper East Side', label: 'Upper East Side' },
    { value: 'Upper West Side', label: 'Upper West Side' },
    { value: 'Wall Street', label: 'Wall Street' },
    { value: 'Washington Heights', label: 'Washington Heights' },
  ];

  //what the user will see

  return (
    <div className="bg-gradient-to-r from-blue-200 min-h-screen"  style={{'backgroundColor':"#DFEBED"}}>
    <h1 className="font-primary text-8xl text-primary" style={{'textShadow': '2px 2px 10px gray'}}>SEARCH</h1>
    <div className="navbar bg-base-10" style={{'display':'flex', 'flex-direction':'columns', 'justify-content':'space-around'}}>
        <div style={{'display':'flex', 'flex-direction':'column'}}>
            <h1 className='font-primary'>Categories</h1>
            <div>
                <ReactSelect
                    name='categories'
                    classNames={{
                        control: () => "border border-gray-300 rounded-md bg-whitefont-primary",
                      }}
                    styles={{'background-color':'transparent'}}
                    options={categoriesOptions}
                    value={categories.map((value) => ({ value, label: value }))}
                    onChange={handleChange}
                    isMulti
                />
            </div>
        </div>
        <div style={{'display':'flex', 'flex-direction':'column'}}>
            <h1 className='font-primary'>Neighborhoods</h1>
            <div>
                <ReactSelect
                    name='neighborhoods'
                    classNames={{
                        control: () => "border border-gray-300 rounded-md bg-white",
                      }}
                    options={neighborhoodOptions}
                    value={neighborhoods.map((value) => ({ value, label: value }))}
                    onChange={handleChange}
                    isMulti
                    isDisabled={isChecked} // disable or enable based on isChecked value
                />
            </div>
        </div>
        
        <div style={{'display':'flex', 'flex-direction':'columns'}}>
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} className="checkbox checkbox-info" />
            <label>Use Current Location?</label>
        </div>
        <button className="btn btn-large" onClick={queryPlacesAPI}>Find!</button>
    </div>
        <div
        className='places flex'
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
        >
            {results.map((result, index) => (
            <ResultRow key={index} result={result} />
            ))}
        </div>
    </div>
  );
};

export default SearchPage;
