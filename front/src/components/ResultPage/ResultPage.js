// ResultPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ResultPage.css"; // Import your CSS file

const ResultPage = () => {
  const { name, number } = useParams();
  const [criteriaData, setCriteriaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8000/api/data");
        const result = await response.json();

        // Check the structure of the API response
        const criteriaData = result.data; // Adjust this based on your API response structure

        // Find the criteria with the matching name
        const selectedCriteria = criteriaData.find(
          (criteria) => criteria.name.toLowerCase().replace(/\s/g, "_") === name
        );

        if (selectedCriteria) {
          // Extract the values corresponding to the prefixed numbers
          const values = selectedCriteria.criteria.reduce((acc, criterion) => {
            if (criterion.variable && criterion.variable[`$${number}`]) {
              acc = criterion.variable[`$${number}`].values;
            }
            return acc;
          }, []);

          // Update the state with the values
          setCriteriaData(values);
        } else {
          console.error(`Criteria with name ${name} not found.`);
        }
      } catch (error) {
        console.error("Error fetching criteria data:", error);
      }
    };

    fetchData();
  }, [name, number]);

  return (
    <div>
      {criteriaData ? (
        <div className="criteria-container">
          <ul className="criteria-list">
            {criteriaData.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading criteria data...</p>
      )}
    </div>
  );
};

export default ResultPage;
