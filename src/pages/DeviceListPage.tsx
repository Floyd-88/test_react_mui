import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import formatDate from "../utils/dateUtils";

interface Device {
  id: string;
  name: string;
  uniqueId: string;
  status: string;
  lastUpdate: string;
}

interface newDevice {
  name: string;
  uniqueId: string;
  status: string;
}

const DeviceListPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddingDevice, setIsAddingDevice] = useState<boolean>(false);
  const [newDevice, setNewDevice] = useState<newDevice>({
    name: "",
    uniqueId: "",
    status: "",
  });

  const email = localStorage.getItem("email") || "";
  const password = localStorage.getItem("password") || "";
  const authString = btoa(`${email}:${password}`);

  useEffect(() => {
    const fetchDevices = async (searchId: string) => {
      setLoading(true);
      try {
        const config: AxiosRequestConfig = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${authString}`,
          },
          params: {},
        };

        if (searchId) {
          if (!config.params) {
            config.params = {};
          }
          config.params.id = searchId;
        }

        const response = await axios.get<Device[]>("api/devices", config);
        if (response.status === 200) {
          setDevices(response.data);
          if (response.data.length === 0) {
            console.log("Данные не найдены");
          }
        } else {
          console.log("Непредвиденная ошибка. Данные не получены");
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices(search);
  }, [search, authString]);

  const handleAddDevice = async () => {
    try {
      // const config: AxiosRequestConfig = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Basic ${authString}`,
      //   }
      // };
      // await axios.post("api/devices", newDevice, config);
      // fetchDevices(search);

      setIsAddingDevice(false);
      const newDeviceWithId = {
        ...newDevice,
        id: Date.now().toString(),
        lastUpdate: new Date().toISOString(),
      };

      setDevices((prevDevices) => [...prevDevices, newDeviceWithId]);

      setNewDevice({
        name: "",
        uniqueId: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleDeleteDevice = async (deviceId: string) => {
    try {
      // const config: AxiosRequestConfig = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Basic ${authString}`,
      //   },
      // };
      // await axios.delete(`api/devices/${deviceId}`, config);
      // fetchDevices(search);
      setDevices((prevDevices) =>
        prevDevices.filter((device) => device.id !== deviceId)
      );
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDevice({
      ...newDevice,
      [name]: value,
    });
  };

  return (
    <Container>
      <Typography marginTop={4} variant="h4" gutterBottom>
        Device List
      </Typography>
      {isAddingDevice ? (
        <div>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={newDevice.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Unique ID"
            fullWidth
            margin="normal"
            name="uniqueId"
            value={newDevice.uniqueId}
            onChange={handleInputChange}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            name="status"
            value={newDevice.status}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddDevice}>
            Add Device
          </Button>
          <Button onClick={() => setIsAddingDevice(false)}>Cancel</Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddingDevice(true)}
        >
          Add Device
        </Button>
      )}

      <TextField
        label="Search by ID"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Unique ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.id}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.uniqueId}</TableCell>
                <TableCell>{device.status}</TableCell>
                <TableCell>{formatDate(device.lastUpdate)}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteDevice(device.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default DeviceListPage;
