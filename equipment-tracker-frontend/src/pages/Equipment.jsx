import { useEffect, useState } from "react";
import { getEquipment, createEquipment, updateEquipment, deleteEquipment } from "../services/api";
import { Container, Typography, List, ListItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    installationDate: "",  
    status: "Operational",
    lastMaintenance: "",   
    nextMaintenance: "",   
    technician: "" 
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token fetch:", token);
      const data = await getEquipment(token);
      setEquipment(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // Convert "2025-01-30T00:00:00" → "2025-01-30"
  };

  const handleOpenDialog = (equipmentItem = null) => {
    if (equipmentItem) {
      setEditMode(true);
      setSelectedEquipment(equipmentItem);
      setFormData({
        name: equipmentItem.name,
        type: equipmentItem.type,
        serialNumber: equipmentItem.serialNumber,
        installationDate: formatDate(equipmentItem.installationDate),
        lastMaintenance: formatDate(equipmentItem.lastMaintenance),
        nextMaintenance: formatDate(equipmentItem.nextMaintenance),
        technician: equipmentItem.technician,
        status: equipmentItem.status,
      });
    } else {
      setEditMode(false);
      setFormData({
        name: "",
        type: "",
        serialNumber: "",
        installationDate: "",
        lastMaintenance: "",
        nextMaintenance: "",
        technician: "",
        status: "Operational",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setSelectedEquipment(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateForAPI = (dateString) => {
    return `${dateString}T00:00:00`; // Convert "2025-01-30" → "2025-01-30T00:00:00"
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!formData.name || !formData.type || !formData.serialNumber || !formData.installationDate || !formData.lastMaintenance || !formData.nextMaintenance || !formData.technician) {
        alert("Please fill in all required fields.");
        return;
      }
  
      const formattedData = {
        ...formData,
        installationDate: formatDateForAPI(formData.installationDate),
        lastMaintenance: formatDateForAPI(formData.lastMaintenance),
        nextMaintenance: formatDateForAPI(formData.nextMaintenance),
      };
  
      if (editMode) {
        await updateEquipment(token, selectedEquipment.id, formattedData);
      } else {
        await createEquipment(token, formattedData);
      }
  
      fetchEquipment();
      handleCloseDialog();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        const token = localStorage.getItem("token");
        await deleteEquipment(token, id);
        fetchEquipment();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Equipment List</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Add Equipment</Button>
      <List>
        {equipment.map((item) => (
          <ListItem key={item.id}>
            {item.name} - {item.status}
            <Button variant="outlined" color="secondary" onClick={() => handleOpenDialog(item)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      {/* Equipment Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? "Edit Equipment" : "Add Equipment"}</DialogTitle>
        <DialogContent>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Type" name="type" value={formData.type} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Serial Number" name="serialNumber" value={formData.serialNumber} onChange={handleChange} fullWidth margin="normal" required />

            <TextField label="Installation Date" type="date" name="installationDate" value={formData.installationDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
            <TextField label="Last Maintenance" type="date" name="lastMaintenance" value={formData.lastMaintenance} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
            <TextField label="Next Maintenance" type="date" name="nextMaintenance" value={formData.nextMaintenance} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />

            <TextField label="Technician" name="technician" value={formData.technician} onChange={handleChange} fullWidth margin="normal" required />
            
            <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
                SelectProps={{ native: true }}
                required
            >
                <option value="Operational">Operational</option>
                <option value="Idle">Idle</option>
                <option value="Faulty">Faulty</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Awaiting Diagnostics">Awaiting Diagnostics</option>
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">{editMode ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Equipment;
