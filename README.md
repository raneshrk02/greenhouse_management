# Smart Greenhouse Management System

## Project Overview
The **Smart Greenhouse Management System** is a web-based application designed to monitor and manage greenhouse conditions efficiently. The system provides real-time data on greenhouse devices, automation rules, logs, and notifications to optimize environmental control.

## Features
- **Login Page:** Secure authentication for users.
- **Dashboard:** Displays key statistics and an overview of all greenhouses.
- **Devices Page:** Lists all sensors and devices with their statuses.
- **Add Device:** Allows users to register new devices.
- **Automation Rules:** Enables users to define automated responses to environmental conditions.
- **Logs Page:** Displays a real-time record of sensor activity.
- **Notifications Page:** Alerts users about critical events and updates.

## Pages and Functionality
### 1. Login Page
- Users enter their registered email and password.
- Credentials are validated, granting access to the dashboard upon successful login.
- Displays an error message for incorrect credentials.

### 2. Dashboard Page
- Overview of the greenhouse system with key metrics.
- Displays the total number of greenhouses, devices, and active greenhouses.
- Users can navigate to different sections via the sidebar.

### 3. Devices Page
- Lists all devices with relevant details (Device ID, Greenhouse ID, etc.).
- Shows the status of each device (active/inactive) with toggle functionality.
- "Add New Device" button for registering new sensors.

### 4. Add Device Functionality
- Form fields:
  - **Device Name** (e.g., Temperature Sensor, Humidity Sensor)
  - **Data Collected** (e.g., Temperature in °C, CO2 in ppm)
  - **Select Greenhouse** dropdown to assign the device.
- "Save Device" button to finalize the process.

### 5. Automation Rules Page
- Users can define automation rules based on sensor data.
- Input fields:
  - **Trigger Condition** (e.g., Temperature > 30°C)
  - **Action** (e.g., Turn on cooling system)
- "Save Rule" button to apply automation settings.

### 6. Logs Page
- Displays a real-time record of sensor activity:
  - **Device** (Sensor name)
  - **Activity** (Active/Inactive status)
  - **Timestamp** (Last recorded activity)
- "Refresh Logs" button to update data.

### 7. Notifications Page
- Alerts users of important system events such as:
  - Low humidity detected
  - High temperature alert
  - New device connected
- Users can **Clear All** notifications or **Mark All as Read**.

## Project Links
- **Figma Design:** [View Design](https://www.figma.com/design/HlfhRFwFPiS3a6j494xzuR/Greenhouse_Monitoring?node-id=0-1&m=dev&t=clikuHKmE60gWvLK-1)
- **Figma Prototype:** [View Prototype](https://www.figma.com/proto/HlfhRFwFPiS3a6j494xzuR/Greenhouse_Monitoring?node-id=0-1&t=clikuHKmE60gWvLK-1)
