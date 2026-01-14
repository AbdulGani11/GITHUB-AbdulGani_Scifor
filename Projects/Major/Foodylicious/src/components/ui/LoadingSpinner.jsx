// LoadingSpinner: loading spinner displayed while content is being fetched.

// Props = data passed into this component (like function arguments)

// Parent component:
//   - <Restaurants /> shows this while fetching restaurant data from API

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center py-5">
          {/* role="status" ensures the loading text is announced as a live update by screen readers.*/}
          <div className="spinner-border text-dark mb-3" role="status">
            {/*.visually-hidden hides that text from sighted users while keeping it readable by screen readers.*/}
            <span className="visually-hidden">Loading...</span>
          </div>
          {/* Custom message (optional). By default, it shows the predefined message. */}
          <p className="text-secondary">{message}</p>
        </div>
      </div>
    </section>
  );
}

export default LoadingSpinner;
