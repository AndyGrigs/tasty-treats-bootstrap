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
  

  // async function loadCategories() {
  //   const categoriesContainer = document.getElementById("categoriesContainer");
  //   const categoriesData = await fetchData("categories");
  
  //   if (categoriesData && categoriesData.length) {
  //     categoriesData.forEach(category => {
  //       const button = document.createElement("button");
  //       button.className = "btn btn-outline-primary me-2";
  //       button.dataset.category = category.name;
  //       button.textContent = category.name;
        
  //       // When a category button is clicked, filter recipes
  //       button.addEventListener("click", () => {
  //         document.querySelectorAll("#categoriesContainer button").forEach(btn => btn.classList.remove("active"));
  //         button.classList.add("active");
  //         loadRecipes({ category: category.name });
  //       });
  
  //       categoriesContainer.appendChild(button);
  //     });
  //   } else {
  //     categoriesContainer.innerHTML = "<p>No categories found.</p>";
  //   }
  // }


  // async function loadEvents() {
  //   const eventsData = await fetchData("events");
  //   const carousel = document.getElementById("carouselImages");
  //   console.log(eventsData)
  //   // console.log(carousel)
  
  //   if (eventsData && eventsData.length) {
  //     carousel.innerHTML = ""; // Clear old content
  
  //     eventsData.map((event, index) => {
  //       console.log(event)
  //       const item = document.createElement("div");
  //       item.className = `carousel-item ${index === 0 ? "active" : ""}`;
  //       item.innerHTML = `
  //         <img src="${event.cook.imgWebpUrl}" class="d-block w-100 rounded" alt="${event.cook.name}">
  //         <div class="carousel-caption d-none d-md-block">
  //           <p>${event.cook.name}</p>
  //         </div>
  //       `;
  //       carousel.appendChild(item);
  //     });
  //   }
  // }
  
  async function loadEvents() {
    const eventsData = await fetchData("events");
    const carousel = document.getElementById("carouselImages");

    if (eventsData && eventsData.length) {
        carousel.innerHTML = ""; // Clear old content

        eventsData.forEach((event, index) => {
            const { cook, topic } = event;

            const item = document.createElement("div");
            item.className = `carousel-item ${index === 0 ? "active" : ""}`;
            item.innerHTML = `
                <div class="d-flex justify-content-center align-items-center">
                    <!-- Koch -->
                    <div class="col-md-3 text-center bg-dark rounded-5">
                        <img src="${cook.imgWebpUrl}" class="rounded-circle img-fluid" alt="${cook.name}">
                        <p class="mt-2">${cook.name}</p>
                    </div>

                    <!-- Gericht -->
                    <div class="col-md-6 text-center bg-dark rounded-5">
                        <img src="${topic.imgWebpUrl}" class="img-fluid rounded" alt="${topic.name}">
                        <p class="fw-bold mt-2">${topic.name}</p>
                        <p class="text-muted">${topic.area}</p>
                    </div>
                    <div class="col-md-6 text-center bg-dark rounded-5">
                        <img src="${topic.imgWebpUrl}" class="img-fluid rounded" alt="${topic.name}">
                    </div>
                </div>
            `;
            carousel.appendChild(item);
        });
    }
}



  
  document.addEventListener("DOMContentLoaded", () => {
    // loadCategories();
    loadEvents();
  });
  