const map = L.map("map").setView([51.505, -0.09], 2);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function getData() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  };

  try {
    const response = await fetch("/xd", options);
    if (!response.ok) {
      console.log("elma satır 34");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    for (item of data) {
      const marker = L.marker([item.lat, item.lon]).addTo(map);

      const txt = `Enlem : ${item.lat}<br>
                         Boylam : ${item.lon}<br>
                         Hava Durumu : ${item.weather}<br>
                         Hava Sıcaklığı : ${item.temperature} &deg; 'dir.`;
      marker.bindPopup(txt);
    }

    /*
          console.log(data);

          const dataContainer = document.getElementById("data-container");
          dataContainer.innerHTML = ""; // Önce mevcut içeriği temizle

          data.forEach((record, index) => {
            const paragraph = document.createElement("p");
            paragraph.className = "custom-paragraph"; // Sınıf ekleyin
            paragraph.innerHTML = `Kayıt ${index + 1} :<br>
                                 Lat : ${record.lat} <br>
                                 Lon : ${record.lon} <br>
                                 Hava Durumu : ${record.weather} <br>
                                 Hava Sıcaklığı : ${record.temperature}`;

            dataContainer.appendChild(paragraph);
            
          });
          */
  } catch (error) {
    console.error("Error:", error);
  }
}

// Sayfa yüklendiğinde verileri getir ve göster
window.onload = getData;
