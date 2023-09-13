import { useState, useEffect } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ParkGrid from './components/ParkGrid'
import { Park } from './components/ParkCard';

function App() {
  const [parks, setParks] = useState<Park[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Array to accumulate parks that have valid images
    let accumulatedParks: Park[] = [];
    // Define the number of parks to fetch per batch
    const parksPerBatch = 12;
    // Define the maximum number of attempts to fetch parks
    const maxTries = 3;
    // Variable to keep track of the total number of parks fetched so far
    let totalFetched = 0;
  
    const fetchParks = async () => {
      // Check if parks are stored locally
      const cachedParks = localStorage.getItem('cachedParks');
      if (cachedParks) {
        setParks(JSON.parse(cachedParks));
        return;
      }
  
      // Loop to try fetching parks up to the defined maxTries
      for(let i = 0; i < maxTries && accumulatedParks.length < 12; i++) {
        try {
          // Fetch the parks
          const response = await fetch(
            `https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=${parksPerBatch}&start=${totalFetched}&api_key=${import.meta.env.VITE_NPS_API_KEY}`
          );
  
          // Throw error for unsuccessful API response
          if (!response.ok) {
            throw new Error(response.statusText);
          }
  
          // Parse JSON data from the API response
          const data = await response.json();
          // Filter parks for valid images
          const validParks = data.data.filter((park: Park) => park.images && park.images.length > 0);
  
          // Update totalFetched with the number of parks fetched in the current batch
          totalFetched += data.data.length;
          // Add valid parks from the current batch to the accumulatedParks array
          accumulatedParks = [...accumulatedParks, ...validParks];
  
        } catch (error) {
          // Log errors and set an error message
          console.error('Error fetching parks:', error);
          setError('There was an error fetching parks.');
          return;
        }
      }
  
      // Update the state with the first 12 valid parks
      const parksToSet = accumulatedParks.slice(0, 12);
      setParks(parksToSet);
  
      // Store park data locally
      localStorage.setItem('cachedParks', JSON.stringify(parksToSet));
    };
  
    // Call fetchParks to initiate the process
    fetchParks();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      {error ? <p className="error">{error}</p> : <ParkGrid parks={parks} />}
      <Footer />
    </>
  )
}

export default App;
