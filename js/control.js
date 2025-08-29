function getShellyStatus(ip, channel, onBtn, offBtn, statusLabel) {
  const url = `http://${ip}/relay/${channel}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const isOn = data.ison;

      // Update button styles
      onBtn.classList.toggle("on", isOn);
      offBtn.classList.toggle("off", !isOn);
      onBtn.classList.toggle("off", !isOn);
      offBtn.classList.toggle("on", isOn);

      // Update status label
      statusLabel.textContent = isOn ? "Status: ON" : "Status: OFF";
      statusLabel.style.color = isOn ? "#e74c3c" : "#27ae60";
    })
    .catch(err => {
      statusLabel.textContent = "Status: Unknown";
      statusLabel.style.color = "#999";
      console.error("Status check failed for", ip, err);
    });
}