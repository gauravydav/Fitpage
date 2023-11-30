// CriteriaPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CriteriaPage.css"; // Import your CSS file

const CriteriaPage = () => {
  const { name } = useParams();
  const [criteria, setCriteria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        // Fetch criteria data based on the name from your API
        const response = await fetch(`http://localhost:8000/api/data`);
        const result = await response.json();

        // Find the item with the matching name
        const selectedItem = result.data.find(
          (item) => item.name.toLowerCase().replace(/\s/g, "_") === name
        );

        if (selectedItem) {
          // Set the criteria if the item is found
          setCriteria({
            name: selectedItem.name,
            tag: selectedItem.tag,
            color: selectedItem.color,
            criteria: selectedItem.criteria,
          });
        } else {
          // Handle the case where the item is not found
          console.error(`Item with name ${name} not found.`);
        }
      } catch (error) {
        console.error("Error fetching criteria:", error);
      }
    };

    fetchCriteria();
  }, [name]);

  const isNumber = (text) => /\d/.test(text);

  const handleNumberClick = (number) => {
    // Navigate to a new page with the number and criteria name as parameters
    navigate(`/result/${name}/${number}`, {
      state: {
        criteriaName: criteria.name,
        clickedNumber: number,
      },
    });
  };

  return (
    <div className="criteria-container">
      {criteria ? (
        <div>
          <div style={{ backgroundColor: " #1680B0", }}>
            <h2 className="criteria-name" style={{fontSize:"15px",padding:"0",margin:"0"}}>{criteria.name}</h2>
            <p className="criteria-tag" style={{ color: criteria.color,fontSize:"10px",padding:"0",margin:"0" }}>
              {criteria.tag}
            </p>
          </div>

          <ul className="criteria-list">
            {criteria.criteria.map((criterion, index) => (
              <li key={criterion.id} className="criteria-item">
                {isNumber(criterion.text) ? (
                  <>
                    <span>
                      {criterion.text.split(/\b(\d+)\b/).map((part, idx) => {
                        return isNumber(part) ? (
                          <a
                            key={idx}
                            href={`#`}
                            onClick={() => handleNumberClick(part)}
                          >
                            <u>({part})</u>
                          </a>
                        ) : (
                          <span key={idx}>{part}</span>
                        );
                      })}
                    </span>
                  </>
                ) : (
                  <span>{criterion.text}</span>
                )}
                {index < criteria.criteria.length - 1 && <span>and </span>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading criteria...</p>
      )}
    </div>
  );
};

export default CriteriaPage;
