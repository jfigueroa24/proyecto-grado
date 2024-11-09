import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  TextareaAutosize,
} from "@mui/material";
import styles from "./api-response.module.scss";
import NavBar from "../Commons/NavBar";
import config from "../../src/config.js";
import { authContext } from "../Auth/AuthContext.js";

function ApiResponses() {
  const { id } = useParams();
  const { token, user } = useContext(authContext);

  const [responses, setResponses] = useState([]);
  const [allowed_methods, setAllowedMethods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState([]);

  useEffect(() => {
    const userApis = async () => {
      if (!token) {
        return;
      }
      try {
        //REVISAR SI SE PUEDEN TRAER API y RESPONSES en un SOLO JSON
        const res = await fetch(`${config.apiUrl}/api/get-api/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { api } = await res.json();

        const response = await fetch(`${config.apiUrl}/api/get-api/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { responses } = await response.json();
        if (response.ok) {
          setResponses(responses);

          setAllowedMethods(api[0].allowed_methods);
        } else if (setResponses.length === 0) {
          return;
        } else {
          alert("Error loading Responses");
        }
      } catch (error) {
        console.error("Error loading APIs:", error);
        alert("Error loading APIs");
      }
    };
    userApis();
  }, [id, token]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJsonInput([]);
  };

  const handleShowResponse = async (index) =>{
    const res = await fetch(`${config.apiUrl}/api/get-api/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { api } = await res.json();

    
    const url = `${config.apiUrl}/public/${user.base_path}/${api[0].nombre}/${index}`;
    window.open(url, '_blank')
  }

  const handleCreateResponse = async () => {
    try {
      let parsedJsonData;
      try {
        parsedJsonData = JSON.parse(jsonInput);
        console.log(parsedJsonData)
      } catch (error) {
        alert("Invalid JSON format in JSON data field", error);
        console.log(error)
        return;
      }
      
      const res = await fetch(`${config.apiUrl}/api/get-api/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { api } = await res.json();

      const response = await fetch(
        `${config.apiUrl}/api/${user.base_path}/${api[0].nombre}`,
        {
          method:"POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ json_data: parsedJsonData }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponses([
          ...responses,
          ...data.map((item)=>({
            indice: item.indice,
            json_data: item.json_data
          }))
        ]);
        alert("Responses created successfully");
        handleCloseModal();
      } else {
        alert("Error creating response: " + data.message);
      }
    } catch (error) {
      alert("Please enter valid JSON data");
      console.error("Error creating response:", error);
    }
  };

  const handleEditResponse = async (index) => {
    const updatedData = prompt("Enter new data in JSON format:");
    if (!updatedData) {
      alert("Invalid JSON format in JSON data field")
      return
    };

    try {
      const res = await fetch(`${config.apiUrl}/api/get-api/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { api } = await res.json();
      const response = await fetch(
        `${config.apiUrl}/api/${user.base_path}/${api[0].nombre}/${index}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedData: JSON.parse(updatedData) }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setResponses((prevResponses) =>
          prevResponses.map((resp) =>
            resp.indice === index
              ? { ...resp, json_data: JSON.parse(updatedData) }
              : resp
          )
        );
      } else {
        alert("Error updating response: " + data.message);
      }
    } catch (error) {
      console.error("Error updating response:" + error);
      alert("Error updating response" + error);
    }
  };

  const handleDeleteResponse = async (index) => {
    
    try {
      const deleteResponse = confirm("Do you want delete this response?");
      if(!deleteResponse) return;
      const res = await fetch(`${config.apiUrl}/api/get-api/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { api } = await res.json();

      const response = await fetch(
        `${config.apiUrl}/api/${user.base_path}/${api[0].nombre}/${index}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setResponses((prevResponses) =>
          prevResponses.filter((resp) => resp.indice !== index)
        );
      } else {
        alert("Error deleting response: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting response:", error);
      alert("Error deleting response");
    }
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <NavBar />
      <Typography
        className={styles.title}
        sx={{ mb: 2, fontWeight: "bold" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        My Responses
      </Typography>

      {responses.length === 0 ? (
        <Typography sx={{ m: 2 }} variant="body1" align="center" gutterBottom>
          The API do not have Responses
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Index (Response)</TableCell>
                <TableCell align="center">Json Data</TableCell>
                <TableCell align="center">Show Response</TableCell>
                <TableCell align="center">Update Response</TableCell>
                <TableCell align="center">Delete Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responses.map((item) => (
                <TableRow
                  key={item.indice}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.indice}
                  </TableCell>
                  <TableCell align="right">
                    {typeof item.json_data === "object"
                      ? JSON.stringify(item.json_data)
                      : item.json_data}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ m: 2, color: "#3c5969" }}
                      variant="text"
                      className={styles.buttonApi}
                      onClick={()=> handleShowResponse(item.indice)}
                      disabled={!allowed_methods.includes("GET")}
                    >
                      Show
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ m: 2, color: "#3c5969" }}
                      variant="text"
                      className={styles.buttonApi}
                      onClick={() => handleEditResponse(item.indice)}
                      disabled={!allowed_methods.includes("PUT")}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{ m: 2, color: "#3c5969" }}
                      variant="text"
                      className={styles.buttonApi}
                      onClick={() => handleDeleteResponse(item.indice)}
                      disabled={!allowed_methods.includes("DELETE")}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button
        className={styles.buttonCreate}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleOpenModal}
        sx={{ mt: 2 }}
        disabled={!allowed_methods.includes("POST")}
      >
        Create a new response
      </Button>

      <Modal className={styles.modalStyle} open={isModalOpen} onClose={handleCloseModal}>
        <Box className={styles.modalBoxStyle}>
          <Typography sx={{fontWeight: "bold",fontSize: 24}} className={styles.title}>Create New Response</Typography>
          <TextareaAutosize
            minRows={30}
            className={styles.TextArea}
            placeholder="Enter JSON data here"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateResponse}
            sx={{ mt: 2 }}
            className={styles.submitButton}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ApiResponses;
