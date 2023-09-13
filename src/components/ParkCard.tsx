interface Activity {
  id: number;
  name: string;
}

interface Image {  
  credit: string;
  altText: string;
  title: string;
  id: number;
  caption: string;
  url: string;
}

 export interface Park {
  name: string;
  description: string;
  images: Image[];
  latitude: string;
  longitude: string;
  activities: Activity[];
  url: string;
  id: number;
}

interface ParkCardProps {
  park: Park;
}

const ParkCard: React.FC<ParkCardProps> = ({ park }) => {
  
  {/* Set park image as card background */}
  const backgroundImageStyle = park.images[0] ? 
  { 
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), 
    url(${park.images[0].url})
  ` 
  } : {};

  return (
      <div className="park-card">
          <h2 style={backgroundImageStyle}>{park.name}</h2>
          <div className="park-info">
            <p className="truncated-description">{park.description}</p>
            {/* Truncate latitude / longitude */}
            <p><strong>Coordinates:</strong> {Number(park.latitude).toFixed(3)} N {Number(park.longitude).toFixed(3)} W</p>
            <h3>Activities:</h3>
            <ul>
                {/* Gather 3 park activities */}
                {park.activities.slice(0, 3).map(activity => (
                    <li key={activity.id}>{activity.name}</li>
                ))}
            </ul>
            <a href={park.url} target="_blank" rel="noopener noreferrer"><button>Learn More &rarr;</button></a>
          </div>
      </div>
  );
}

export default ParkCard;
