// Fetch the JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Get the table body element
    const tableBody = document.querySelector('#data-table tbody');

    // Loop through the data and create table rows
    data.forEach(item => {
      // Create a new row
      const row = document.createElement('tr');

      // Create and append the name cell
      const nameCell = document.createElement('td');
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      // Create and append the email cell
      const emailCell = document.createElement('td');
      emailCell.textContent = item.email;
      row.appendChild(emailCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });
