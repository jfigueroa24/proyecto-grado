import { Button, Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Auth/AuthContext";
import config from "../../../../src/config";
import { Link as RouterLink } from "react-router-dom";

function InitialHome(){
  const { user, token } = useContext(authContext);
  const [count, setCount] = useState([]);

  const countApis = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await fetch(`${config.apiUrl}/api/get-apis/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setCount(data?.length);
      } else {
        alert("Error loading APIs");
      }
    } catch (error) {
      console.error("Error loading APIs:", error);
      alert("Error loading APIs");
    }
  };

  useEffect(() => {
    countApis();
  }, []);

  return (
    <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Welcome, {user.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Count APIs: {count}
          </Typography>
          <Button
            component={RouterLink}
            to="/home/get-apis"
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Go to APIs
          </Button>
        </CardContent>
      </Card>
  )
}

export default InitialHome;