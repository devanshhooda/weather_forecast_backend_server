interface WeatherData {
    dayOfWeek: string;
    todayMarker: boolean;
    date: string;
    temperature: number;
    description: string;
}

interface WeatherForecastProps {
    weatherDataList: WeatherData[]
}

const WeatherForecast = ({ weatherDataList }: WeatherForecastProps) => {

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {weatherDataList.map((data) => (
                    <div key={data.date} className="card m-2" style={{ width: '150px' }}>
                        <div className={`card-body ${data.todayMarker ? 'bg-primary text-white' : ''}`}>
                            <h5 className="card-title">{data.dayOfWeek}</h5>
                            {data.todayMarker && <p>Today</p>}
                            <p className="card-text">Temperature: {data.temperature}°C</p>
                            <p className="card-text">Description: {data.description}</p>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
