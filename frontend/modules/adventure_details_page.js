import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const url = search.split('=')[1];
  //console.log(url)

  // Place holder for functionality to work in the Stubs
  return url;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
  try{
    let res = await fetch(url);
    let response = await res.json();
    return response;
  }
  catch(err){
    return null;
}



  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure)
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  adventure.images.forEach((ele) => {
    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", ele);
    imgDiv.setAttribute("class", "activity-card-image");
    document.getElementById("photo-gallery").appendChild(imgDiv);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images)
  document.getElementById(
    "photo-gallery"
  ).innerHTML = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>
  `;

  images.forEach((ele) => {
    const carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");
    const imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", ele);
    imgDiv.setAttribute("class", "d-block w-100");
    carouselItem.appendChild(imgDiv);
    document.querySelector(".carousel-inner").appendChild(carouselItem);
  });
  document.getElementsByClassName("carousel-item")[0].className =
    "carousel-item active";

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOut = document.getElementById("reservation-panel-sold-out");
  const available = document.getElementById("reservation-panel-available");
  const costPerHead = document.getElementById("reservation-person-cost");
  if(adventure.available){
    available.style.display = "block";
    soldOut.style.display = "none";
    costPerHead.innerHTML = adventure.costPerHead;
  }
  else{
    available.style.display = "none";
    soldOut.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.getElementById("reservation-cost");
  return (reservationCost.innerHTML = adventure.costPerHead * persons);

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  myForm.onsubmit = (event) => {
    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const person = form.elements["person"].value;
    const reservationData = {
      name: name,
      date: date,
      person: person,
      adventure: adventure.id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    };

    fetch(`${config.backendEndpoint}/reservations/new`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        alert("Success");
        location.reload();
      })
      .catch((error) => {
        alert("Failed!");
        console.error("Error:", error);
      });
    event.preventDefault();
  };

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reserved = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    return (reserved.style.display = "block");
  } else {
    return (reserved.style.display = "none");
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
