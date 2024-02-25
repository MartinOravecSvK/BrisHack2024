import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapComponent from './Components/home';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import AddDataComponent from './Components/temp';

const firebaseConfig = {
  databaseURL: "https://brishack2024-teamturtles-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapComponent />} />
        <Route path="/temp" element={<AddDataComponent />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
