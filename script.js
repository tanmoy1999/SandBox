// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the data container element
        const dataContainer = document.getElementById('data-container');

        // Define the number of items per page
        const itemsPerPage = 3;

        // Calculate the total number of pages
        const totalPages = Math.ceil(Object.keys(data).length / itemsPerPage);

        // Function to display data for a specific page
        function displayPage(page) {
            // Clear the data container
            dataContainer.innerHTML = '';

            // Calculate the starting and ending indices of the data for the current page
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Get the keys of the stocks
            const stockKeys = Object.keys(data);

            // Iterate over the stocks for the current page
            for (let i = startIndex; i < endIndex && i < stockKeys.length; i++) {
                const stock = stockKeys[i];

                // Create a new heading element for the stock
                const stockHeading = document.createElement('h2');
                stockHeading.textContent = stock;
                dataContainer.appendChild(stockHeading);

                // Get the data for the current stock
                const stockData = data[stock][0];

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
            }
        }

        // Function to create pagination links
        function createPaginationLinks() {
            // Create a pagination container
            const paginationContainer = document.createElement('div');
            paginationContainer.classList.add('pagination');

            // Iterate over the total number of pages
            for (let i = 1; i <= totalPages; i++) {
                // Create a pagination link
                const paginationLink = document.createElement('a');
                paginationLink.href = '#';
                paginationLink.textContent = i;

                // Add an event listener to the pagination link
                paginationLink.addEventListener('click', () => {
                    displayPage(i);
                });

                // Append the pagination link to the container
                paginationContainer.appendChild(paginationLink);
            }

            // Append the pagination container to the data container
            dataContainer.appendChild(paginationContainer);
        }

        // Display the first page initially
        displayPage(1);

        // Create the pagination links
        createPaginationLinks();
    })
    .catch(error => console.error(error));
