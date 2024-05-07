
import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Select,
  MenuItem
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const initialFormData = [
  { requestType: "request", vgNumber: "", issueId: "" },
  { requestType: "request", vgNumber: "", issueId: "" },
  { requestType: "request", vgNumber: "", issueId: "" },
];

const FormTable = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  const handleAddRow = () => {
    setFormData([
      ...formData,
      { requestType: "request", vgNumber: "", issueId: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleDeleteAllRows = () => {
    setFormData([]);
  };

  const handleSubmit = async () => {
    // Get the data from the form fields
    const formData = {
      requestType: "complaint",
      vgNumber: "vg00009",
      issueId: 22,
    };

    try {
      // Send a POST request to the server with the form data
      const response = await axios.post(
        "http://localhost:8080/closeSMT",
        formData
      );

      // Handle the response from the server
      console.log(response.data); // Log the response data from the server
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    }
  };

  const handleDeleteAllSMTS = () => {
    console.log("delete all smts");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request Type</TableCell>
            <TableCell>VG Number</TableCell>
            <TableCell>Issue Id</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Select
                  type="text"
                  value={row.requestType}
                  onChange={(e) =>
                    handleChange(index, "requestType", e.target.value)
                  }
                >
                  <MenuItem value="request">Request</MenuItem>
                  <MenuItem value="transfers">Transfers</MenuItem>
                  <MenuItem value="complaint">Complaint</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={row.vgNumber}
                  onChange={(e) =>
                    handleChange(index, "vgNumber", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={row.issueId}
                  onChange={(e) =>
                    handleChange(index, "issueId", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(index)}
                >
                  Save
                </Button>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteRow(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="secondary" onClick={handleAddRow}>
        Add Row
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteAllRows}
      >
        Delete All Rows
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteAllSMTS}
      >
        Delete All SMTs
      </Button>
    </TableContainer>
  );
};

export default FormTable;
