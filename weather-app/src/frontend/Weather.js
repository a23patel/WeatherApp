import React, {useState} from 'react';
import axios from 'axios'
import './App.css'

function Weather({setWeather}){
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
        "Wisconsin", "Wyoming"
    ];

    const getWeather = async (e) => {
        e.preventDefault()

        if (!city) {
            alert('City is required');
            return;
        }

        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/weather/?city=${city}&state=${state}`);
            setWeather(response.data);
        }
        catch(error){
            console.error("Error fetching the weather data !", error)
        }
    };

    return (
        <div className="Weather">
            <form onSubmit={getWeather}>
                <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select state (optional)</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            <button type="submit">Get Current Weather</button>
            </form>
        </div>
    );
};

export default Weather
