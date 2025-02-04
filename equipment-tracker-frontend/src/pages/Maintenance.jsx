import { useEffect, useState } from "react";
import { getMaintenanceRecords, addMaintenanceRecord, updateMaintenanceRecord, deleteMaintenanceRecord } from "../services/api";
import { Container, Typography, List, ListItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";

const Maintenance = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    equipmentId: "",
    typeOfWork: "Preventive Maintenance",
    description: "",
    dateOfCompletion: new Date().toISOString().split("T")[0],
    technician: "",
  });

  useEffect(() => {
    fetchMaintenanceRecords();
  }, []);

  const fetchMaintenanceRecords = async () => {
    try {
      const data = await getMaintenanceRecords();
      setMaintenanceRecords(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenDialog = (record = null) => {
    if (record) {
      setEditMode(true);
      setSelectedRecord(record);
      setFormData({
        equipmentId: record.equipmentId,
        typeOfWork: record.typeOfWork,
        description: record.description,
        dateOfCompletion: record.dateOfCompletion.split("T")[0],
        technician: record.technician,
      });
    } else {
      setEditMode(false);
      setFormData({
        equipmentId: "",
        typeOfWork: "Preventive Maintenance",
        description: "",
        dateOfCompletion: new Date().toISOString().split("T")[0],
        technician: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setSelectedRecord(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!formData.equipmentId || !formData.description || !formData.technician) {
        alert("Please fill in all required fields.");
        return;
      }

      if (editMode) {
        await updateMaintenanceRecord(selectedRecord.id, formData);
      } else {
        await addMaintenanceRecord(formData);
      }

      fetchMaintenanceRecords();
      handleCloseDialog();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteMaintenanceRecord(id);
        fetchMaintenanceRecords();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  

  return (
    <Container>
      <Typography variant="h4">Maintenance Records</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Add Maintenance</Button>
      <List>
        {maintenanceRecords.map((item) => (
          <ListItem key={item.id}>
            {item.equipmentId} - {item.typeOfWork} - {item.description}
            <Button variant="outlined" color="secondary" onClick={() => handleOpenDialog(item)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? "Edit Maintenance Record" : "Add Maintenance Record"}</DialogTitle>
        <DialogContent>
            <TextField label="Equipment ID" name="equipmentId" value={formData.equipmentId} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Date of Completion" type="date" name="dateOfCompletion" value={formData.dateOfCompletion} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Technician" name="technician" value={formData.technician} onChange={handleChange} fullWidth margin="normal" required />
            
            <Select label="Type of Work" name="typeOfWork" value={formData.typeOfWork} onChange={handleChange} fullWidth>
            <MenuItem value="Preventive Maintenance">Preventive Maintenance</MenuItem>
            <MenuItem value="Repair">Repair</MenuItem>
            <MenuItem value="Diagnostics">Diagnostics</MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">{editMode ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Maintenance;
