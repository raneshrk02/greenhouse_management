import React, { useState } from "react";
import "./App.css";

const Button = ({ onClick, children, variant }) => (<button onClick={onClick} className={variant ? `btn ${variant}` : "btn"}> {children} </button>);

const Input = ({ value, onChange, placeholder, type = "text" }) => (<input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}/>);

const App = () => {
  const [page, setPage] = useState("login");
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  
  const handlePageChange = (newPage) => {
    if (newPage === "devices") {
      setSelectedGreenhouse(null);
    }
    setPage(newPage);
  };
  
  return (
    <div className="container">
      {page === "login" ? (
        <Login setPage={handlePageChange} />
      ) : (
        <Dashboard 
          page={page} 
          setPage={handlePageChange}
          selectedGreenhouse={selectedGreenhouse}
          setSelectedGreenhouse={setSelectedGreenhouse}
        />
      )}
    </div>
  );
};

const Login = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <Input value={email} onChange={setEmail} placeholder="Email" type="email" />
        <Input value={password} onChange={setPassword} placeholder="Password" type="password" />
        <Button onClick={() => setPage("dashboard")}>Log in</Button>
      </div>
    </div>
  );
};

const Dashboard = ({ page, setPage, selectedGreenhouse, setSelectedGreenhouse }) => {
  const pageComponents = {
    dashboard: <Home setPage={setPage} setSelectedGreenhouse={setSelectedGreenhouse} />, 
    devices: <DeviceManager selectedGreenhouse={selectedGreenhouse} setSelectedGreenhouse={setSelectedGreenhouse} />, 
    logs: <Logs />, 
    automation: <Automation setPage={setPage} />, 
    notifications: <Notifications />
  };

  return (
    <div className="dashboard-container">
      <Sidebar setPage={setPage} activePage={page} />
      <div className="content"> {pageComponents[page]} </div>
    </div>
  );
};

const Sidebar = ({ setPage, activePage }) => {
  const menuItems = [{id: "dashboard", label: "Dashboard"}, {id: "devices", label: "Devices"}, {id: "automation", label: "Automation Rules"}, {id: "logs", label: "Logs"}, {id: "notifications", label: "Notifications"}];

  return (
    <div className="sidebar">
      <h3>Smart Greenhouse Management</h3>
      {menuItems.map(item => (
        <button key={item.id} onClick={() => setPage(item.id)} className={activePage === item.id ? "active" : ""}> {item.label} </button>
      ))}
    </div>
  );
};

const GreenhouseCard = ({ greenhouse, setPage, setSelectedGreenhouse }) => {
  const handleCardClick = () => {
    setSelectedGreenhouse(greenhouse.id);
    setPage("devices");
  };

  return (
    <div className="greenhouse-card" onClick={handleCardClick}>
      <h3>{greenhouse.name}</h3>
      <p><strong>Location:</strong> {greenhouse.location}</p>
      <p><strong>Status:</strong> <span className={`status-text ${greenhouse.status}`}>{greenhouse.status}</span></p>
      <p><strong>Devices:</strong> {greenhouse.deviceCount}</p>
      <div className="card-footer">
        <span>Click to view devices</span>
      </div>
    </div>
  );
};

const Home = ({ setPage, setSelectedGreenhouse }) => {
  const greenhouses = [{id: "GH1", name: "Greenhouse 1", location: "North Field", status: "active", deviceCount: 2 }, {id: "GH2", name: "Greenhouse 2", location: "South Meadow", status: "active", deviceCount: 2}, {id: "GH3", name: "Greenhouse 3", location: "East Enclosure", status: "inactive", deviceCount: 1}];

  return (
    <div className="content-box">
      <h2>Dashboard</h2>
      <div className="greenhouse-summary">
        <div className="summary-card">
          <h3>3</h3>
          <p>Total Greenhouses</p>
        </div>
        <div className="summary-card">
          <h3>5</h3>
          <p>Total Devices</p>
        </div>
        <div className="summary-card">
          <h3>2</h3>
          <p>Active Greenhouses</p>
        </div>
      </div>
      
      <h3 className="section-title">Your Greenhouses</h3>
      <div className="greenhouse-grid">
        {greenhouses.map(greenhouse => (
          <GreenhouseCard 
            key={greenhouse.id} 
            greenhouse={greenhouse} 
            setPage={setPage}
            setSelectedGreenhouse={setSelectedGreenhouse}
          />
        ))}
      </div>
      
      <div className="dashboard-buttons">
        <Button onClick={() => setPage("logs")}>View System Logs</Button>
        <Button onClick={() => setPage("automation")}>Manage Automation</Button>
      </div>
    </div>
  );
};

const DeviceManager = ({ selectedGreenhouse, setSelectedGreenhouse }) => {
  const initialDevices = [{id: 1, name: "Temperature Sensor", status: "active", dataCollected: "Temperature (°C)", deviceID: "T123", GreenhouseID: "GH1"}, {id: 2, name: "Humidity Sensor", status: "inactive", dataCollected: "Relative Humidity (%)", deviceID: "H456", GreenhouseID: "GH1"}, {id: 3, name: "Soil Moisture Sensor", status: "active", dataCollected: "Soil Moisture Level (%)", deviceID: "S789", GreenhouseID: "GH2"}, {id: 4, name: "Light Sensor", status: "active", dataCollected: "Light Intensity (lux)", deviceID: "L101", GreenhouseID: "GH2"}, {id: 5, name: "CO2 Sensor", status: "inactive", dataCollected: "CO2 Concentration (ppm)", deviceID: "C112", GreenhouseID: "GH3"}];

  const [devices, setDevices] = useState(initialDevices);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: "", dataCollected: "", GreenhouseID: selectedGreenhouse || "" });

  const filteredDevices = selectedGreenhouse ? devices.filter(device => device.GreenhouseID === selectedGreenhouse): devices;

  const toggleDeviceStatus = (deviceId) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, status: device.status === "active" ? "inactive" : "active" } 
        : device
    ));
  };

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.dataCollected) {
      const newId = Math.max(...devices.map(d => d.id)) + 1;
      setDevices([...devices, { 
        id: newId, 
        name: newDevice.name, 
        dataCollected: newDevice.dataCollected,
        status: "inactive",
        deviceID: `D${newId}${Math.floor(Math.random() * 100)}`,
        GreenhouseID: newDevice.GreenhouseID || (selectedGreenhouse || "GH1")
      }]);
      setNewDevice({ name: "", dataCollected: "", GreenhouseID: selectedGreenhouse || "" });
      setShowAddDevice(false);
    }
  };

  return (
    <div className="content-box">
      <h2>
        {selectedGreenhouse ? `Devices in ${selectedGreenhouse}` : "All Devices"}
      </h2>
      
      {selectedGreenhouse && (
        <div className="filtering-controls">
          <Button onClick={() => setSelectedGreenhouse(null)}>Show All Devices</Button>
        </div>
      )}
      
      <div className="device-list">
        <table>
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Greenhouse ID</th>
              <th>Device Name</th>
              <th>Data Collected</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map(device => (
              <tr key={device.id}>
                <td><span className={`status-indicator ${device.status}`}></span>{device.deviceID}</td>
                <td>{device.GreenhouseID}</td>
                <td>{device.name}</td>
                <td>{device.dataCollected}</td>
                <td>
                  <Button onClick={() => toggleDeviceStatus(device.id)} variant={`toggle-btn ${device.status}`}>
                    {device.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddDevice ? (
        <div className="add-device-form">
          <h4>Add New Device</h4>
          <Input 
            value={newDevice.name} 
            onChange={(val) => setNewDevice({...newDevice, name: val})} 
            placeholder="Device Name" 
          />
          <Input 
            value={newDevice.dataCollected} 
            onChange={(val) => setNewDevice({...newDevice, dataCollected: val})} 
            placeholder="Data Collected (with units)" 
          />
          {!selectedGreenhouse && (
            <select 
              value={newDevice.GreenhouseID} 
              onChange={(e) => setNewDevice({...newDevice, GreenhouseID: e.target.value})}
              className="dropdown-select"
            >
              <option value="">Select Greenhouse</option>
              <option value="GH1">Greenhouse 1</option>
              <option value="GH2">Greenhouse 2</option>
              <option value="GH3">Greenhouse 3</option>
            </select>
          )}
          <div className="form-actions">
            <Button onClick={() => setShowAddDevice(false)} variant="secondary">Cancel</Button>
            <Button onClick={handleAddDevice}>Save Device</Button>
          </div>
        </div>
      ) : (
        <div className="device-manager-actions">
          <Button onClick={() => setShowAddDevice(true)}>Add New Device</Button>
        </div>
      )}
    </div>
  );
};

const Logs = () => (
  <div className="content-box">
    <h2>Logs</h2>
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>Activity</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Temperature Sensor</td><td>Active</td><td>2025-03-11 11:11</td></tr>
        <tr><td>Humidity Sensor</td><td>Inactive</td><td>2025-03-12 16:15</td></tr>
        <tr><td>Light Sensor</td><td>Active</td><td>2025-03-13 15:30</td></tr>
      </tbody>
    </table>
    <Button onClick={() => alert("Refreshing logs...")}>Refresh Logs</Button>
  </div>
);

const Automation = ({ setPage }) => {
  const [trigger, setTrigger] = useState("");
  const [action, setAction] = useState("");

  const handleSave = () => {
    alert(`Rule saved: When ${trigger}, do ${action}`);
    setTrigger("");
    setAction("");
  };

  return (
    <div className="content-box">
      <h2>Define Automation Rule</h2>
      <Input value={trigger} onChange={setTrigger} placeholder="Trigger Condition" />
      <Input value={action} onChange={setAction} placeholder="Action" />
      <Button onClick={handleSave}>Save Rule</Button>
    </div>
  );
};

const Notifications = () => {
  const notifications = ["Low humidity detected", "System update available", "High temperature alert", "New device connected"];

  return (
    <div className="content-box">
      <h2>Notifications</h2>
      {notifications.map((note, index) => (
        <p key={index}>{note}</p>
      ))}
      <Button onClick={() => alert("Clearing all notifications...")}>Clear All</Button>
      <Button onClick={() => alert("Marking all as read...")}>Mark All as Read</Button>
    </div>
  );
};

export default App;