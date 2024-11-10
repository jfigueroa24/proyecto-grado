import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import styles from "./api-creator.module.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Auth/AuthContext";
import config from "../../src/config";

function ApiCreator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allowed_methods, setAllowedMethods] = useState([]);
  const [json_data, setJson_data] = useState([]);
  const { token } = useContext(authContext);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setAllowedMethods((prevMethods) =>
      checked
        ? [...prevMethods, value]
        : prevMethods.filter((method) => method !== value)
    );
  };
  const handleJsonDataChange = (e) => {
    setJson_data(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    let parsedJsonData;
    try {
      parsedJsonData = JSON.parse(json_data);
    } catch (error) {
      alert("Invalid JSON format in JSON data field", error);
      console.log(error)
      return;
    }
    
    try {
      const api = await fetch(
        `${config.apiUrl}/api/create-api/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            allowed_methods,
            json_data: parsedJsonData,
          }),
        }
      );

      const data = await api.json();
      if (api.ok) {
        alert("API successfully created - Login.");
        navigate("/home/get-apis");
      } else {
        alert(data.message || "Error creating API");
      }
    } catch (error) {
      console.error("Error creating API:", error);
    }
  };

  return (
    <Container maxWidth={"md"} className={styles.container}>
      <h2 className={styles.title}>Creator API</h2>
      <form className={styles.formContainer} onSubmit={handleCreate}>
        <div className={styles.leftColumn}>
          <FormLabel className={styles.labelApiCreator}>Name</FormLabel>
          <TextField
            className={styles.TextFieldName}
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormLabel className={styles.labelApiCreator}>Description</FormLabel>
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
            <FormControlLabel
              control={
                <Checkbox value={"GET"} onChange={handleCheckboxChange} />
              }
              label="GET"
            />
            <FormControlLabel
              control={
                <Checkbox value={"POST"} onChange={handleCheckboxChange} />
              }
              label="POST"
            />
            <FormControlLabel
              control={
                <Checkbox value={"PUT"} onChange={handleCheckboxChange} />
              }
              label="PUT"
            />
            <FormControlLabel
              control={
                <Checkbox value={"DELETE"} onChange={handleCheckboxChange} />
              }
              label="DELETE"
            />
          </FormGroup>
        </div>
        <div className={styles.rightColumn}>
          <FormLabel className={styles.labelApiCreator}>JSON data</FormLabel>
          <TextareaAutosize
            minRows={30}
            className={styles.TextArea}
            placeholder="Enter JSON data here"
            value={json_data}
            onChange={handleJsonDataChange}
          />
        </div>
        <div className={styles.buttonSubmitContainer}>
          <Button
            className={styles.buttonSubmit}
            variant="contained"
            type="submit"
          >
            Create API
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default ApiCreator;
