import './App.css'
import Search from './components/Search'
import Weather from './components/Weather';
function App() {
  const handleOnSearchChange = (searchData) =>{
    console.log(searchData);
  }

  return (
    <>
      <div className="App">
        <Weather></Weather>
      </div>
    </>
  )
}

export default App;