// src/pages/Diseases.jsx
import React, { useEffect, useState } from 'react';
import SubSidebar from '../components/SubSidebar';
import axios from 'axios';

export default function Diseases() {
  const [diseaseItems, setDiseaseItems] = useState([]);

  useEffect(() => {
    // Fetch data depuis le backend
    axios.get('http://localhost:8081/api/diseases')
      .then(response => {
        const formatted = response.data.map(d => ({
          label: d.name,
          link: `/diseases/${d.id}` // Lien vers l'article
        }));
        setDiseaseItems(formatted);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="flex">
      <SubSidebar title="Diseases" items={diseaseItems} />
      <div className="ml-64 p-4">
        <h1 className="text-2xl font-bold">Diseases</h1>
        {/* Ici, tu peux afficher le contenu de l'article sélectionné */}
      </div>
    </div>
  );
}