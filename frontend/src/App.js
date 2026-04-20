import React, { useState, useEffect } from "react";

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';

function App() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  // Load projects from backend
  const fetchProjects = () => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: "New Project" }),
    }).then(() => {
      setName("");
      fetchProjects(); // Refresh list
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="brutalist-card">
            <div className="brutalist-header">
              <h2 className="mb-0">AGILEO PROJECTS</h2>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="mb-5 d-flex">
                <input
                  type="text"
                  className="form-control brutalist-input form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ENTER NEW PROJECT NAME"
                  required
                />
                <button className="btn brutalist-button btn-lg" type="submit">
                  ADD PROJECT
                </button>
              </form>
              
              <ul className="brutalist-list list-unstyled">
                {projects.length === 0 ? (
                  <li className="brutalist-list-item text-center">NO PROJECTS YET. ADD ONE ABOVE!</li>
                ) : (
                  projects.map((p, i) => (
                    <li key={i} className="brutalist-list-item d-flex justify-content-between align-items-center">
                      {p[1].toUpperCase()}
                      <span className="badge brutalist-badge">ID: {p[0]}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
