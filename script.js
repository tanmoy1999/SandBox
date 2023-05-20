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

            // Get the keys and values from the stock data
            const dates = Object.keys(stockData);
            const values = Object.values(stockData);

            // Create a canvas element for the chart
            const canvas = document.createElement('canvas');
            dataContainer.appendChild(canvas);

            // Create a line chart
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: stock,
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    })
    .catch(error => console.error(error));
