import ParkCard, { Park } from './ParkCard';

interface ParkGridProps {
  parks: Park[];
}

const ParkGrid: React.FC<ParkGridProps> = ({ parks }) => {
  return (
      <section className="park-grid">
          {/* Create ParkCards */}
          {parks.map(park => <ParkCard key={park.id} park={park} />)}
      </section>
  );
}

export default ParkGrid;