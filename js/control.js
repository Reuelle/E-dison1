function toggleShelly(ip, channel, state, onBtn, offBtn, statusLabel, deviceId) {
  if (CONFIG.mode === "local") {
    const url = `http://${ip}/relay/${channel}?turn=${state}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          updateButtonStyles(state, onBtn, offBtn);
          statusLabel.textContent = `Status: ${state.toUpperCase()}`;
        } else {
          statusLabel.textContent = "Local control failed";
          console.error(`Local control failed for ${ip}`);
        }
      })
      .catch(err => {
        statusLabel.textContent = "Local error";
        console.error("Local fetch error:", err);
      });
  } else {
    const url = "https://shelly-197-eu.shelly.cloud/device/relay/control";
    const body = new URLSearchParams({
      id: deviceId,
      channel: channel,
      turn: state,
      auth_key: CONFIG.authKey
    });

    fetch(url, {
      method: "POST",
      body
    })
      .then(res => res.json())
      .then(data => {
        console.log("Cloud control response:", data);
        if (data.isok) {
          updateButtonStyles(state, onBtn, offBtn);
          statusLabel.textContent = `Status: ${state.toUpperCase()}`;
        } else {
          statusLabel.textContent = "Cloud control failed";
          console.error("Shelly error:", data.errors);
        }
      })
      .catch(err => {
        statusLabel.textContent = "Cloud control failed";
        console.error("Fetch error:", err);
      });
  }
}

function getShellyStatus(ip, channel, onBtn, offBtn, statusLabel, deviceId) {
  if (CONFIG.mode === "local") {
    fetch(`http://${ip}/relay/${channel}`)
      .then(res => res.json())
      .then(data => {
        const isOn = data.ison;
        updateButtonStyles(isOn ? "on" : "off", onBtn, offBtn);
        statusLabel.textContent = `Status: ${isOn ? "ON" : "OFF"}`;
      })
      .catch(err => {
        statusLabel.textContent = "Status: Unreachable";
        console.error("Local status error:", err);
      });
  } else {
    const url = "https://shelly-197-eu.shelly.cloud/device/status";
    const body = new URLSearchParams({
      id: deviceId,
      auth_key: CONFIG.authKey
    });

    fetch(url, {
      method: "POST",
      body
    })
      .then(res => res.json())
      .then(data => {
        console.log("Cloud status response:", data);
        if (!data || !data.data || !data.data.device_status) {
          statusLabel.textContent = "Cloud status error";
          console.error("Invalid cloud response:", data);
          return;
        }

        const isOn = data.data.device_status.relays[channel].ison;
        updateButtonStyles(isOn ? "on" : "off", onBtn, offBtn);
        statusLabel.textContent = `Status: ${isOn ? "ON" : "OFF"}`;
      })
      .catch(err => {
        statusLabel.textContent = "Cloud unreachable";
        console.error("Cloud fetch error:", err);
      });
  }
}

function updateButtonStyles(state, onBtn, offBtn) {
  const isOn = state === "on";
  onBtn.classList.toggle("on", isOn);
  offBtn.classList.toggle("off", !isOn);
  onBtn.classList.toggle("off", !isOn);
  offBtn.classList.toggle("on", isOn);
}