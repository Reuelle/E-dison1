// js/config.js

const CONFIG = {
  mode: "cloud", // "local" or "cloud"

  authKey: "MzRkMzE0dWlk2B19946AEEB1EB8F1F9D13255ED3F1AD5EB93B52A0BF39F982B1D0F66BFB2C8C0C72D7F4F7745793", // Replace with your actual key

  devices: [
    {
      name: "Main Light",
      ip: "192.168.1.61",
      channel: 0,
      id: "34cdb07de1bc" // Shelly Cloud device ID
    },
    {
      name: "Garage Switch",
      ip: "192.168.1.101",
      channel: 0,
      id: "shellydevice789012"
    }
  ]
};