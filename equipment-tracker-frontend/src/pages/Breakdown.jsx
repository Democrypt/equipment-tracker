import { useEffect, useState } from "react";
import { getBreakdowns, createBreakdown, updateBreakdown, deleteBreakdown, downloadReport } from "../services/api";
import { Container, Typography, List, ListItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";

const Breakdown = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [formData, setFormData] = useState({
    equipmentId: "",
    description: "",
    reportedAt: new Date().toISOString().split("T")[0], // Default to today
    technician: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchBreakdowns();
  }, []);

  const fetchBreakdowns = async () => {
    try {
      const data = await getBreakdowns();
      setBreakdowns(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenDialog = (breakdownItem = null) => {
    if (breakdownItem) {
      setEditMode(true);
      setSelectedBreakdown(breakdownItem);
      setFormData({
        equipmentId: breakdownItem.equipmentId,
        description: breakdownItem.description,
        reportedAt: breakdownItem.reportedAt.split("T")[0],
        technician: breakdownItem.technician,
        status: breakdownItem.status,
      });
    } else {
      setEditMode(false);
      setFormData({
        equipmentId: "",
        description: "",
        reportedAt: new Date().toISOString().split("T")[0],
        technician: "",
        status: "Pending",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setSelectedBreakdown(null);
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
        await updateBreakdown(selectedBreakdown.id, formData);
      } else {
        await createBreakdown(formData);
      }

      fetchBreakdowns();
      handleCloseDialog();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this breakdown?")) {
      try {
        await deleteBreakdown(id);
        fetchBreakdowns();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Breakdowns</Typography>
      
      {/* Report Download Buttons */}
      <Button variant="contained" color="primary" onClick={() => downloadReport("pdf")} style={{ marginRight: "10px" }}>
        Download PDF Report
      </Button>
      <Button variant="contained" color="secondary" onClick={() => downloadReport("excel")}>
        Download Excel Report
      </Button>
      
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} style={{ marginTop: "10px" }}>
        Add Breakdown
      </Button>

      <List>
        {breakdowns.map((item) => (
          <ListItem key={item.id}>
            {item.equipmentId} - {item.description} - {item.status}
            <Button variant="outlined" color="secondary" onClick={() => handleOpenDialog(item)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      {/* Breakdown Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? "Edit Breakdown" : "Add Breakdown"}</DialogTitle>
        <DialogContent>
          <TextField label="Equipment ID" name="equipmentId" value={formData.equipmentId} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Reported Date" type="date" name="reportedAt" value={formData.reportedAt} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Technician" name="technician" value={formData.technician} onChange={handleChange} fullWidth margin="normal" required />
          
          <Select label="Status" name="status" value={formData.status} onChange={handleChange} fullWidth>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
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

export default Breakdown;
