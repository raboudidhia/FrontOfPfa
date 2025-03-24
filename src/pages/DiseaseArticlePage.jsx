import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DiseaseArticlePage() {
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const [disease, setDisease] = useState(null);

  useEffect(() => {
    // Fetch l'article depuis le backend
    axios.get(`http://localhost:8081/api/diseases/${id}`)
      .then(response => setDisease(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!disease) return <div>Chargement...</div>;

  return (
    <div className="ml-64 p-4">
      <h1 className="text-2xl font-bold">{disease.name}</h1>
      <p>{disease.description}</p>
      <h2 className="text-xl font-bold mt-4">Symptômes</h2>
      <ul>
        {disease.symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Traitements</h2>
      <ul>
        {disease.treatments.map((treatment, index) => (
          <li key={index}>{treatment}</li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Article</h2>
      <p>{disease.article.content}</p>
    </div>
  );
}