/**
 * Description: Set user input to use the fetchtrips api
 */





document.getElementById('findTripsButton').addEventListener('click', function() {
 
  // Create a new URL object
  let url = new URL('/api/findTrips', window.location.origin);
 
  // Gather user input into params object
  
  let inputs = [
     {id: 'departureStationIds', type: 'array', emptyValue: '', isTagContainer: true},
     {id: 'returnStationIds', type: 'array', emptyValue: '', isTagContainer: true},
     {id: 'departureTime', type: 'string', emptyValue: ''},
     {id: 'returnTime', type: 'string', emptyValue: ''},
     {id: 'coveredDistanceMeters', type: 'number', emptyValue: ''},
     {id: 'durationSeconds', type: 'number', emptyValue: ''}
   ];
 
   let params = {};
 
  inputs.forEach(input => {
    if (input.isTagContainer) {
      let tagContainer = document.getElementById(input.id);
      let tagElements = Array.from(tagContainer.getElementsByClassName('tag'));
      let idValues = tagElements.map(tag => Number(tag.dataset.id));
      params[input.id.replace('selected-', '')] = idValues;
    } else {
      let inputValue = document.getElementById(input.id).value;
      if (inputValue !== input.emptyValue) {
        if (input.type === 'number') {
          params[input.id] = Number(inputValue);
        } else {
          params[input.id] = inputValue;
        }
      }
    }
  });
  
 
  console.log('Initial url:', url);
  console.log('Initial params:', params);
  
 // Add each parameter to the URL
 for (let key in params) {
   if (Array.isArray(params[key])) {
     params[key].forEach(value => url.searchParams.append(key + '[]', value));
   } else {
     url.searchParams.append(key, params[key]);
   }
 }
 
 
  console.log('Final url:', url);
 
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Response received:', response);
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    if (data.errors) {
        console.log('Error details:', data.errors);
    } else {
      // Get a reference to the results div
      let resultsDiv = document.getElementById('results');
      let foundTripsDiv = document.getElementById('foundTripsHintText');
 
      // Clear the current contents of the results div
      resultsDiv.innerHTML = '';
      foundTripsDiv.innerHTML = '';
 
      // Convert each item in the data array into a paragraph and append it to the results div
      data[0].forEach(item => {
        let p = document.createElement('p');
        p.textContent = JSON.stringify(item);
        resultsDiv.appendChild(p);
      });
      let foundTrips = data[1] 
      foundTripsDiv.textContent = JSON.stringify(foundTrips);
      
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
 });