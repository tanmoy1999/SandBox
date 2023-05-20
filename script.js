// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the data container element
        const dataContainer = document.getElementById('data-container');

        // Get the search input and search button elements
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        // Function to display data for a specific stock
        function displayStock(stock) {
            // Clear the data container
            dataContainer.innerHTML = '';

            // Check if the stock exists in the data
            if (data.hasOwnProperty(stock)) {
                const stockData = data[stock][0];

                // Create a new heading element for the stock
                const stockHeading = document.createElement('h2');
                stockHeading.textContent = stock;
                dataContainer.appendChild(stockHeading);

                // Create an array to hold labels and data for the bar graph
                const labels = [];
                const values = [];

                // Iterate over each key-value pair in the stock data
                for (const key in stockData) {
                    labels.push(key);
                    values.push(stockData[key]);
                }

                // Create a canvas element for the bar graph
                const canvas = document.createElement('canvas');
                dataContainer.appendChild(canvas);

                // Create the bar graph using Chart.js
                new Chart(canvas.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Stock Data',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)'
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            } else {
                // Display a message if the stock is not found
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Stock not found';
                dataContainer.appendChild(errorMessage);
            }
        }

        // Add event listener to the search button
        searchButton.addEventListener('click', () => {
            const stock = searchInput.value.trim();
            displayStock(stock);
        });

        // Display the initial data
        displayStock('20MICRONS');
    })
    .catch(error => console.error(error));
