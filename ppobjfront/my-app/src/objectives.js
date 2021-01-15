import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Objectives() {
  const [objectives, setObjectives] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 objectives 를 초기화하고
        setError(null);
        setObjectives(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://localhost:4000/api/v1/objectives'
        );
        setObjectives(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchObjectives();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!objectives) return null;
  return (
    <ul>
      {objectives.map(objective => (
        <li key={objective.id}>
          {objective.name} ({objective.description})
        </li>
      ))}
    </ul>
  );
}

export default Objectives;