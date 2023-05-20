// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the data container element
        const dataContainer = document.getElementById('data-container');

        // Iterate over each key-value pair in the JSON data
        for (const stock in data) {
            // Create a new heading element for the stock
            const stockHeading = document.createElement('h2');
            stockHeading.textContent = stock;
            dataContainer.appendChild(stockHeading);

            // Get the data for the current stock
            const stockData = data[stock][0];

            // Iterate over each key-value pair in the stock data
            for (const key in stockData) {
                // Create a new paragraph element for each key-value pair
                const paragraph = document.createElement('p');
                paragraph.textContent = `${key}: ${stockData[key]}`;
                dataContainer.appendChild(paragraph);
            }
        }
    })
    .catch(error => console.error(error));
