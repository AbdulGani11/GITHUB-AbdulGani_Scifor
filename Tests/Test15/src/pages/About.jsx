function About() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">About Page</h2>
      <p>This is the about page.</p>
      <p>This application demonstrates the core features of React Router v7:</p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          BrowserRouter for client-side routing
        </li>
        <li className="list-group-item">
          Routes and Route components for defining routes
        </li>
        <li className="list-group-item">
          Link component for navigation without page reloads
        </li>
      </ul>
    </div>
  );
}

export default About;
