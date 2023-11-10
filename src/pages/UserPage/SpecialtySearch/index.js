import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation ,useNavigate } from "react-router-dom";


const SpecialtySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");

  const params = new URLSearchParams(location.search);
  const name = params.get('name');

  useEffect(() => {
    const getSpecialty = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/specialty?name=${name}`);
        setSpecialty(response.data.payload);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };
    getSpecialty();
  }, []);

  const handleClick = async (id) => {
    navigate(`/detail-specialty/${id}`);
  };

  return (
    <div className="specialty-list container">
      <div className="specialty-list-top"></div>
      <div className="specialty-list-content">
        <h4 style={{ marginTop: "30px" }}>Kết quả tìm kiếm</h4>
        {specialty &&
          specialty.map((item) => (
            <div
              className="specialty-item"
              style={{borderBottom:'none'}}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <img src={`http://localhost:3333/${item.image}`} />
              <p>{item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialtySearch;
