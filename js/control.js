// js/control.js

function toggleShelly(ip, channel, state, onBtn, offBtn, statusLabel, deviceId) {
  if (CONFIG.mode === "local") {
    const url = `http://${ip}/relay/${channel}?turn=${state}`;
    fetch(url)
      .then(res => {
        if (res.ok) {
          updateButtonStyles(state, onBtn, offBtn);
          statusLabel.textContent = `Status: ${state.toUpperCase()}`;
        } else {
          alert(`Local control failed for ${ip}`);
        }
      })
      .catch(err => alert("Error: " + err));
  } else {
    const url = "https://shelly-asia-eu.shelly.cloud/device/relay/control";
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
        updateButtonStyles(state, onBtn, offBtn);
        statusLabel.textContent = `Status: ${state.toUpperCase()}`;
      })
      .catch(err => alert("Cloud control failed: " + err));
  }
}

function updateButtonStyles(state, onBtn, offBtn) {
  const isOn = state === "on";
  onBtn.classList.toggle("on", isOn);
  offBtn.classList.toggle("off", !isOn);
  onBtn.classList.toggle("off", !isOn);
  offBtn.classList.toggle("on", isOn);
}