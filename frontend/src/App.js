import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  // Load projects from backend
  const fetchProjects = () => {
    fetch("http://localhost:8000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: "New Project" }),
    }).then(() => {
      setName("");
      fetchProjects(); // Refresh list
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Agileo Projects</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <button type="submit">Add Project</button>
      </form>
      <ul>
        {projects.map((p, i) => (
          <li key={i}>{p[1]}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
