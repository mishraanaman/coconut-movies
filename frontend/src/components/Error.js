// src/components/Error.jsx
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.statusText || error?.message || "Unknown Error"}</p>
    </div>
  );
};

export default Error;
