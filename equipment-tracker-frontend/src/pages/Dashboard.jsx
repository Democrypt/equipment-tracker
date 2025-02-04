import { useEffect, useState } from "react";
import { getMaintenanceRecords } from "../services/api";
import { Container, Typography, Grid, Paper, List, ListItem } from "@mui/material";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";



// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend, PointElement);

const Dashboard = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMaintenanceRecords(token);
        setMaintenanceRecords(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  // Maintenance Types Breakdown
  const getMaintenanceTypeData = () => {
    const typeCounts = {};

    maintenanceRecords.forEach((record) => {
      const type = record.typeOfWork;
      if (!typeCounts[type]) {
        typeCounts[type] = 0;
      }
      typeCounts[type]++;
    });

    return typeCounts;
  };

  const maintenanceTypeData = getMaintenanceTypeData();
  const maintenanceTypeLabels = Object.keys(maintenanceTypeData);
  const maintenanceTypeCounts = Object.values(maintenanceTypeData);

  // Maintenance by Technician
  const getMaintenanceByTechnician = () => {
    const technicianCounts = {};

    maintenanceRecords.forEach((record) => {
      const technician = record.technician;
      if (!technicianCounts[technician]) {
        technicianCounts[technician] = 0;
      }
      technicianCounts[technician]++;
    });

    return technicianCounts;
  };

  const maintenanceTechnicianData = getMaintenanceByTechnician();
  const maintenanceTechnicianLabels = Object.keys(maintenanceTechnicianData);
  const maintenanceTechnicianCounts = Object.values(maintenanceTechnicianData);

  // Top 5 Most Maintained Equipment
  const getTopMaintainedEquipment = () => {
    const equipmentCounts = {};

    maintenanceRecords.forEach((record) => {
      const equipment = record.equipmentName || `Equipment ${record.equipmentId}`;
      if (!equipmentCounts[equipment]) {
        equipmentCounts[equipment] = 0;
      }
      equipmentCounts[equipment]++;
    });

    return Object.entries(equipmentCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by maintenance count
      .slice(0, 5);
  };

  const topMaintainedEquipment = getTopMaintainedEquipment();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Maintenance Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Bar Chart - Maintenance by Month */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Maintenance Records by Month</Typography>
            <Bar
              data={{
                labels: maintenanceTypeLabels,
                datasets: [
                  {
                    label: "Completed Maintenance",
                    data: maintenanceTypeCounts,
                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        {/* Line Chart - Maintenance Trends */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Maintenance Trends Over Time</Typography>
            <Line
              data={{
                labels: maintenanceTypeLabels,
                datasets: [
                  {
                    label: "Maintenance Trend",
                    data: maintenanceTypeCounts,
                    borderColor: "rgba(255, 99, 132, 1)",
                    fill: false,
                    tension: 0.1,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        {/* Pie Chart - Maintenance Type Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Maintenance Types Breakdown</Typography>
            <Pie
              data={{
                labels: maintenanceTypeLabels,
                datasets: [
                  {
                    label: "Maintenance Types",
                    data: maintenanceTypeCounts,
                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        {/* Doughnut Chart - Maintenance by Technician */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Maintenance Performed by Technician</Typography>
            <Doughnut
              data={{
                labels: maintenanceTechnicianLabels,
                datasets: [
                  {
                    label: "Technician Workload",
                    data: maintenanceTechnicianCounts,
                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        {/* Top 5 Most Maintained Equipment */}
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Top 5 Most Maintained Equipment</Typography>
            <List>
              {topMaintainedEquipment.map(([equipment, count]) => (
                <ListItem key={equipment}>
                  {equipment}: {count} maintenance tasks
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
