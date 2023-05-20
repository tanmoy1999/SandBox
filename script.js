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
    })
    .catch(error => console.error(error));
