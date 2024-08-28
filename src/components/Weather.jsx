import { useEffect, useState } from "react";
import Search from "./Search";

const Weather = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [noData, setNoData] = useState(false); 

    const fetchWeatherData = async (param) => {
        setLoading(true);
        setNoData(false); 
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=644d3423e289be5150f8201150b09115`);
            const data = await response.json();

            if (data.cod === "404") { 
                setNoData(true);
                setWeatherData(null);
            } else {
                setWeatherData(data);
                setNoData(false);
            }
        } catch (e) {
            console.log(e);
            setNoData(true); 
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchWeatherData(search);
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    useEffect(() => {
        fetchWeatherData("bengaluru");
    }, []);

    return (
        <>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div className="loading">Loading...</div>
            ) : noData ? (
                <div className="no-data">No Data Found</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>{weatherData?.name}, <span>{weatherData?.sys.country}</span></h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{(weatherData?.main.temp / 10).toFixed(2)}°C</div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
                    </p>
                    <div className="weather-info">
                        <div className="col">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed} Kmph</p>
                                <p>Wind</p>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Weather;
