
// recorrer el arry pageNames nav recorrer paginas html dentro del proyecto
document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("#actualpage");
    h2.textContent = h1.textContent;
  
    const previousBtn = document.getElementById("previous-page");
    const nextBtn = document.getElementById("next-page");
  
    const pageNames = [
      "index.html",
      "upcoming_events.html",
      "past_events.html",
      "contact.html",
      "stats.html",
    ];
  
  
    const currentPath = window.location.pathname;
    const currentPageIndex = pageNames.indexOf(currentPath.split("/").pop());
  
    function previousPage() {
      if (currentPageIndex > 0) {
        window.location.href = pageNames[currentPageIndex - 1];
      } else {
        window.location.href = pageNames[pageNames.length - 1]; // recorrido ciclico
      }
    }
  
    function nextPage() {
      if (currentPageIndex < pageNames.length - 1) {
        window.location.href = pageNames[currentPageIndex + 1];
      } else {
        window.location.href = pageNames[0]; // recorrido ciclico
      }
    }
  
    previousBtn.addEventListener("click", previousPage);
    nextBtn.addEventListener("click", nextPage);
  
     
    
  });
  
  
  // Fetch events from the API
  export async function fetchEvents() {
    try {
      const response = await fetch(
         //'./script/amazing.json'  // en caso que el servidor remoto no funcione
        "https://mindhub-xj03.onrender.com/api/amazing"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return { events: [] };
    }
  };
  
  
  export function handleBookNowButtonClick(containerElement) {
    // Event Listener for "More Info" buttons
    containerElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("book-now-btn")) {
        const eventData = JSON.parse(event.target.dataset.event);
  
        // Save the event data in localStorage
        localStorage.setItem("selectedEvent", JSON.stringify(eventData));
  
        // Redirect the user to details.html
        window.location.href = "./details.html";
      }
    });
  };