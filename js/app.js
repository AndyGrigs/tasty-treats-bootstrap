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
  

  async function loadCategories() {
    const categoriesContainer = document.getElementById("categoriesContainer");
    const categoriesData = await fetchData("categories");
  
    if (categoriesData && categoriesData.length) {
      categoriesData.forEach(category => {
        const button = document.createElement("button");
        button.className = "btn btn-outline-primary me-2";
        button.dataset.category = category.name;
        button.textContent = category.name;
        
        // When a category button is clicked, filter recipes
        button.addEventListener("click", () => {
          document.querySelectorAll("#categoriesContainer button").forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
          loadRecipes({ category: category.name });
        });
  
        categoriesContainer.appendChild(button);
      });
    } else {
      categoriesContainer.innerHTML = "<p>No categories found.</p>";
    }
  }


  async function loadEvents() {
    const eventsData = await fetchData("events");
    const carousel = document.getElementById("carouselImages");
  
    if (eventsData && eventsData.length) {
      carousel.innerHTML = ""; // Clear old content
  
      eventsData.forEach((event, index) => {
        const item = document.createElement("div");
        item.className = `carousel-item ${index === 0 ? "active" : ""}`;
        item.innerHTML = `
          <img src="${event.image || "https://via.placeholder.com/500x300"}" class="d-block w-100 rounded" alt="${event.title}">
          <div class="carousel-caption d-none d-md-block">
            <p>${event.title}</p>
          </div>
        `;
        carousel.appendChild(item);
      });
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadEvents();
  });
  