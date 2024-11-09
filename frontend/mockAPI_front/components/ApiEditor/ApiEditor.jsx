import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import styles from "./api-editor.module.scss";
import config from "../../src/config";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../Auth/AuthContext";

function APIEditor() {
  const { token } = useContext(authContext);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allowed_methods, setAllowedMethods] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/get-api/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            }         
          }
        );
        const { api } = await response.json();

        setName(api[0].nombre);
        setDescription(api[0].description);
        setAllowedMethods(api[0].allowed_methods);
      } catch (error) {
        alert("Error fetching API", error);
        navigate("/home/get-apis")
      }
    };
    fetchAPI();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/update-api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, allowed_methods }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("API successfully updated.");
        navigate("/home/get-apis")
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating api", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setAllowedMethods((prevMethods) =>
      e.target.checked
        ? [...prevMethods, value]
        : prevMethods.filter((method) => method !== value)
    );
  };

  return (
    <Container maxWidth={"xs"} className={styles.container}>
      <h2 className={styles.title}>Editor API</h2>
      <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.leftColumn}>
          <TextField
            className={styles.TextFieldName}
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            className={styles.TextFieldDescription}
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormGroup>
            <FormLabel className={styles.labelApiCreator}>
              API Methods
            </FormLabel>
            {["GET", "POST", "PUT", "DELETE"].map((method) => (
              <FormControlLabel
                key={method}
                control={
                  <Checkbox
                    value={method}
                    checked={allowed_methods.includes(method)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={method}
              />
            ))}
          </FormGroup>
        </div>
        <div className={styles.buttonSubmitContainer}>
          <Button
            className={styles.buttonSubmit}
            variant="contained"
            type="submit"
            onClick={handleSave}
          >
            Update API
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default APIEditor;
