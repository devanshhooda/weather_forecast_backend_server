import Spinner from "./Spinner";

interface WeatherData {
    dayOfWeek: string;
    todayMarker: boolean;
    date: string;
    temperature: number;
    description: string;
}

interface WeatherForecastProps {
    weatherDataList: WeatherData[] | null
}

const WeatherForecast = ({ weatherDataList }: WeatherForecastProps) => {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {weatherDataList == null ?
                <Spinner /> :
                weatherDataList.map((data) => (
                    <div key={data.date} className="card m-2" style={{ width: '150px' }}>
                        <div className={`card-body ${data.todayMarker ? 'bg-primary text-white' : ''}`}>
                        <h5 className="card-title">{data.dayOfWeek}</h5>
                            {data.todayMarker && <p>Today</p>}
                        <p className="card-text">{data.temperature}°C</p>
                        <p className="card-text">{data.description}</p>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
