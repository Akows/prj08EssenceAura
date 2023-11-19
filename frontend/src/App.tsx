import React from 'react';
import axios from 'axios';

function App() {
  const handleCreate = () => {
    const testData = 'Test data';

    axios.post('http://localhost:3001/api/create', { data: testData })
      .then(response => {
        console.log(response.data);
        alert('Data created successfully');
      })
      .catch(error => {
        console.error('Error creating data', error);
        alert('Error creating data');
      });
  };

  return (
    <button onClick={handleCreate}>Create Test Data</button>
  );
}

export default App;

