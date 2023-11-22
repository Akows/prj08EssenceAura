import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

function App() {

  // 프론트엔드 -> 백엔드 -> 데이터베이스 연동 확인용 임시 기능.
  // 각 파트의 연동이 정상 동작함을 확인하고 코드를 주석 처리함.
  // const handleCreate = () => {
  //   const testData = 'Test data';

  //   axios.post('http://localhost:3001/api/create', { data: testData })
  //     .then(response => {
  //       console.log(response.data);
  //       alert('Data created successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error creating data', error);
  //       alert('Error creating data');
  //     });
  // };

  // return (
  //   <button onClick={handleCreate}>Create Test Data</button>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );


}

export default App;

