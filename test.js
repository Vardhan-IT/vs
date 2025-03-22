let watchID;
let isTracking = false;
let prevPosition = null;
let totalDistance = 0;

document.getElementById("startBtn").addEventListener("click", function() {
    if (!isTracking) {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(updateDistance, showError, { enableHighAccuracy: true });
            isTracking = true;
            document.getElementById("pauseBtn").disabled = false;
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
});

document.getElementById("pauseBtn").addEventListener("click", function() {
    if (isTracking) {
        navigator.geolocation.clearWatch(watchID);
        isTracking = false;
        document.getElementById("pauseBtn").disabled = true;
    }
});

function updateDistance(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    if (prevPosition) {
        let distance = calculateDistance(prevPosition.lat, prevPosition.lon, lat, lon);
        totalDistance += distance;
        document.getElementById("distance").innerText = totalDistance.toFixed(2);
    }

    prevPosition = { lat, lon };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of Earth in meters
    let dLat = (lat2 - lat1) * (Math.PI / 180);
    let dLon = (lon2 - lon1) * (Math.PI / 180);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    rturn R * c;
}

function showError(error) {
    alert("Error in retrieving location: " + error.message);
}
