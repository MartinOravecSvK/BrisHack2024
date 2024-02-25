import { render, screen } from '@testing-library/react';
// import App from './App';
import Home from './Components/home'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


function App() {
  return <BrowserRouter>
  {/* <Navigation id='navbar'></Navigation> */}
      <Routes>
          <Route path="" element={<Home/>}/>
      </Routes>
  </BrowserRouter>;
}
export default App;
