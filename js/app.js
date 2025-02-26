const API_BASE = "https://tasty-treats-backend.p.goit.global/api";

async function fetchData(endpoint) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }
  