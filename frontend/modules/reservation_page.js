import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(config.backendEndpoint + '/reservations')
    // console.log(await response.json());
    return await response.json();
    }catch(error){
      return null;
    }


  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let reservationBanner = document.getElementById('no-reservation-banner');
  let reservationTable = document.getElementById('reservation-table-parent');
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0){
    reservationBanner.style.display='none';
    reservationTable.style.display = 'block';
    reservations.forEach(ele => {
      const trEle = document.createElement('tr');
      const date = new Date(ele.date);
      const time = new Date(ele.time);
      const options = {day: 'numeric', year: 'numeric', month: 'long', time :'full'};
      trEle.innerHTML =`
      <th scope="col">${ele.id}</th>
      <td scope="col">${ele.name}</td>
      <td scope="col">${ele.adventureName}</td>
      <td scope="col">${ele.person}</td>
      <td scope="col">${date.toLocaleDateString('en-IN')}</td>
      <td scope="col">${ele.price}</td>
      <td scope="col">${time.toLocaleTimeString('en-IN',options)}</td>
      <td><div class="reservation-visit-button" id=${
        ele.id
      }><a href="../detail/?adventure=${
    ele.adventure
    }">Visit Adventure</a></div></td>
      `
      document.getElementById('reservation-table').appendChild(trEle);
     
    });
  }else{
    reservationBanner.style.display='block';
    reservationTable.style.display = 'none';  
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
