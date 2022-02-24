import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("Buyer");
  }, []);

  return <div style={{ textAlign: "center" }}>Welcome - {name}</div>;
};

export default Home;