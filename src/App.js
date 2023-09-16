import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import fetchRssFeed from "./api_handler/api_handler";
import JobsTable from "./components/JobsTable";

import GoogleMapComponent from "./components/MapComponent";

function App() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesList, setCountriesList] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      setLoading(true);

      await fetchRssFeed().then((result) => {
        setFeedItems(result[0]);
        setCountriesList(result[1]);
        setLoading(false);
      });
    };

    fetch();
  }, []);


  return (
    <div className="App">
      <Router>
        <nav className="nav-container">
          <ul className="nav-list">
            <li className="nav-item">
              <div>
                <Link to="/">Jobs</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/map">Maps</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<JobsTable feedItems={feedItems} loading={loading} />}
          >
          </Route>
          <Route
            path="/map"
            element={
              <GoogleMapComponent jobData={countriesList}></GoogleMapComponent>
            }
          >
          </Route>
          {/* <Route path='*' element={<ProfilePage></ProfilePage>}> </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
