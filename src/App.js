import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import apiHandler from "./api_handler/api_handler";
import JobsTable from "./components/JobsTable";

import GoogleMapComponent from "./components/MapComponent";

function App() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesList, setCountriesList] = useState({});
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        const result = await apiHandler.fetchRssFeed();
        setFeedItems(result.rssItems);
        setCountriesList(result.countriesMap);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      } finally {
        setLoading(false);
      }
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
              <GoogleMapComponent countriesList={countriesList} ></GoogleMapComponent>
            }
          >
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
