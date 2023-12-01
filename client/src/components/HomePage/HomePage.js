// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataBox from './DataBox';

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-fitpage.onrender.com/api/data');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="phone-section">
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <Link to={`/${item.name.toLowerCase().replace(/\s/g, '_')}`} style={{ textDecoration: 'none' }}>
            <DataBox data={item} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
