import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Home Page</div>;
};

export default Home;
