// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the data container element
        const dataContainer = document.getElementById('data-container');

        // Get the pagination elements
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageNumber = document.getElementById('page-number');

        // Set the number of bar graphs to display per page
        const graphsPerPage = 20;

        // Calculate the total number of pages
        const totalPages = Math.ceil(Object.keys(data).length / graphsPerPage);

        // Initialize the current page
        let currentPage = 1;

        // Function to render the bar graphs for the current page
        function renderPage() {
            // Clear the data container
            dataContainer.innerHTML = '';

            // Calculate the start and end indexes of the current page
            const startIndex = (currentPage - 1) * graphsPerPage;
            const endIndex = startIndex + graphsPerPage;

            // Get the stocks for the current page
            const stocks = Object.keys(data).slice(startIndex, endIndex);

            // Iterate over each stock
            stocks.forEach(stock => {
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
            });

            // Update the page number
            pageNumber.textContent = currentPage;

            // Enable/disable pagination buttons based on current page
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }

        // Function to navigate to the previous page
        function goToPrevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderPage();
            }
        }

        // Function to navigate to the next page
        function goToNextPage() {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage();
            }
        }

        // Add event listeners to the pagination buttons
        prevBtn.addEventListener('click', goToPrevPage);
        nextBtn.addEventListener('click', goToNextPage);

        // Render the initial page
        renderPage();
    })
    .catch(error => console.error(error));
