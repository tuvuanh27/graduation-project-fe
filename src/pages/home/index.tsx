import React from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={() => {
          navigate("/manager");
        }}
      >
        Manager
      </Button>
    </div>
  );
};

export default Home;
