import "./styles.css";
import React, { useState, useEffect } from "react";

function App() {
  // State to store the cat information
  const [catInfo, setCatInfo] = useState(null); // Initially set to null
  const [shouldFetch, setShouldFetch] = useState(false); // Flag to trigger fetch

  // Function to fetch cat information from the API
  const fetchCatInfo = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?has_breeds=True",
        {
          headers: {
            "x-api-key":
              "live_yCJ3YQfRGUwy5fKHBgvPXQvX4btF6yjUpI7aWWrLTnuLww6rtsUaYWU1XtWPORI0", // Replace with your API key
          },
        }
      );
      const data = await response.json();

      // Extract relevant cat info
      const catData = {
        image: data[0].url,
        breed: data[0].breeds[0]?.name || "Unknown breed",
        temperament: data[0].breeds[0]?.temperament || "Unknown temperament",
      };

      // Update state with the new cat information
      setCatInfo(catData);
    } catch (error) {
      console.error("Error fetching cat information:", error);
    }
  };

  // UseEffect to call fetchCatInfo on mount or when shouldFetch changes
  useEffect(() => {
    if (shouldFetch) {
      fetchCatInfo(); // This will fetch the cat info when shouldFetch is true
      setShouldFetch(false); // Reset the flag after fetching
    }
  }, [shouldFetch]); // Dependency on shouldFetch to trigger fetch

  // Automatically fetch cat info on component mount
  useEffect(() => {
    setShouldFetch(true); // Trigger the fetch when the component mounts
  }, []);

  return (
    <div className="app">
      <h1 className="title">Cat Picture Generator</h1>
      <main className="content">
        {/* Grid Container displaying only one item */}
        <div className="grid-container">
          {catInfo ? (
            <div className="grid-item">
              <img src={catInfo.image} alt="Cat" className="cat-image" />
              <h3>Breed: {catInfo.breed}</h3>
              <p>Temperament: {catInfo.temperament}</p>
            </div>
          ) : (
            <p>Loading cat info...</p>
          )}
        </div>
        {/* Button to fetch new cat info */}
        <button className="button" onClick={() => setShouldFetch(true)}>
          Get A New Cat!
        </button>
      </main>
    </div>
  );
}

export default App;
