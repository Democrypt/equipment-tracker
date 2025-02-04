import React, { useEffect, useState } from "react";
import axios from "axios";

const BreakdownList = () => {
    const [breakdowns, setBreakdowns] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5043/api/breakdowns")
            .then(response => setBreakdowns(response.data))
            .catch(error => console.error("Error fetching breakdowns:", error));
    }, []);

    const downloadReport = (type) => {
        window.open(`http://localhost:5043/api/reports/${type}`, "_blank");
    };

    return (
        <div>
            <h2>Equipment Breakdowns</h2>
            <button onClick={() => downloadReport("pdf")}>Download PDF</button>
            <button onClick={() => downloadReport("excel")}>Download Excel</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipment ID</th>
                        <th>Description</th>
                        <th>Technician</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {breakdowns.map(b => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.equipmentId}</td>
                            <td>{b.description}</td>
                            <td>{b.technician}</td>
                            <td>{b.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BreakdownList;
