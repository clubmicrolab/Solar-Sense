const API_BASE_URL = `http://localhost:8080`;
const latitude = 47.061470;
const longitude = 28.867153; 

  
export function getWeeklyPredictions() {
    return fetch(`${API_BASE_URL}/weekly-prediction?latitude=${latitude}&longitude=${longitude}`)
    .then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching the data:", error);
        return null; 
    });
}


export function getLast7DaysEnergy() {
    return fetch(`${API_BASE_URL}/last_7days_wd`)
    .then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching the real production data:", error);
        return null; 
    });
}

export function getHourlyPredictions() {
    return fetch(`${API_BASE_URL}/hourly-prediction`)
    .then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching the hourly predictions:", error);
        return null; 
    });
}

export function getHourlyReal() {
    return fetch(`${API_BASE_URL}/last_7days_wh`)
    .then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching the real production data per hour:", error);
        return null; 
    });
}