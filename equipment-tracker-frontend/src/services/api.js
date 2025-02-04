import axios from "axios";

const API_BASE_URL = "http://localhost:5055/api"; // Change if backend runs on a different port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };
  
  

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const getEquipment = async () => {
    try {
      let token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Unauthorized: No token found");
      }
  
      const response = await api.get("/equipment", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as a string
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response);
      throw new Error(error.response?.data?.message || "Failed to fetch equipment");
    }
  };  

// Create new equipment
export const createEquipment = async (token, equipmentData) => {
    try {
        const response = await api.post("/equipment", equipmentData, {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create equipment");
    }
};

// Update equipment
export const updateEquipment = async (token, id, equipmentData) => {
    try {
        const response = await api.put(`/equipment/${id}`, equipmentData, {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update equipment");
    }
};

// Delete equipment
export const deleteEquipment = async (token, id) => {
    try {
        await api.delete(`/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete equipment");
    }
};

export const getStatusCounts = async (token) => {
    try {
        const response = await api.get("/dashboard/status-counts", {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch status counts");
    }
};

export const getRecentMaintenance = async (token) => {
    try {
        const response = await api.get("/dashboard/recent-maintenance", {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch recent maintenance");
    }
};

export const getMaintenanceRecords = async () => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await api.get("/maintenance", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch maintenance records");
  }
};

export const addMaintenanceRecord = async (recordData) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found");

    console.log("Sending data to API:", recordData); // Debugging log

    const response = await api.post("/maintenance", recordData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("API Response:", response.data); // Debugging log

    return response.data;
  } catch (error) {
    console.error("Error adding maintenance record:", error.response?.data); // Log error
    throw new Error(error.response?.data?.message || "Failed to add maintenance record");
  }
};


export const updateMaintenanceRecord = async (id, recordData) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await api.put(`/maintenance/${id}`, recordData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update maintenance record");
  }
};

export const deleteMaintenanceRecord = async (id) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found");

    await api.delete(`/maintenance/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete maintenance record");
  }
};

  export const getBreakdowns = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
  
      const response = await api.get("/breakdowns", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch breakdowns");
    }
  };
  
  export const createBreakdown = async (breakdownData) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
  
      const response = await api.post("/breakdowns", breakdownData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create breakdown");
    }
  };

  const handleSave = async () => {
  try {
    if (!formData.equipmentId || !formData.description || !formData.technician) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedData = {
      equipmentId: Number(formData.equipmentId),
      description: formData.description,
      reportedAt: `${formData.reportedAt}T00:00:00`, // Format Date
      technician: formData.technician,
      status: formData.status,
    };

    if (editMode) {
      await updateBreakdown(selectedBreakdown.id, formattedData);
    } else {
      await createBreakdown(formattedData);
    }

    fetchBreakdowns();
    handleCloseDialog();
  } catch (error) {
    alert(error.message);
  }
};
  
  export const updateBreakdown = async (id, breakdownData) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
  
      const response = await api.put(`/breakdowns/${id}`, breakdownData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update breakdown");
    }
  };
  
  export const deleteBreakdown = async (id) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
  
      await api.delete(`/breakdowns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete breakdown");
    }
  };
  
  // Reports API (PDF & Excel)
  export const downloadReport = async (type) => {
    try {
      window.open(`${API_BASE_URL}/reports/${type}`, "_blank");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to download report");
    }
  };

export default api;