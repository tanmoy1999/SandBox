// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the data container element
        const dataContainer = document.getElementById('data-container');
        const itemsPerPage = 5; // Set the number of items to display per page
        let currentPage = 1; // Initialize the current page

        // Function to display the data for the current page
        function displayData() {
            // Clear the data container
            dataContainer.innerHTML = '';

            // Calculate the start and end index of the items to display
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Iterate over each key-value pair in the JSON data
            for (const stock in data) {
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

                // Break the loop if the end index is reached
                if (endIndex && endIndex <= labels.length) {
                    break;
                }
            }
        }

        // Function to go to the previous page
        function goToPreviousPage() {
            if (currentPage > 1) {
                currentPage--;
                displayData();
            }
        }

        // Function to go to the next page
        function goToNextPage() {
            const totalItems = Object.keys(data).length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayData();
            }
        }

        // Create previous and next buttons for pagination
        const previousButton = document.createElement('button');
        previousButton.textContent = 'Previous';
        previousButton.addEventListener('click', goToPreviousPage);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', goToNextPage);

        // Append the buttons to the data container
        dataContainer.appendChild(previousButton);
        dataContainer.appendChild(nextButton);

        // Display the initial data
        displayData();
    })
    .catch(error => console.error(error));
