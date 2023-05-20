// Fetch the JSON data from the Git repository URL
fetch('https://tanmoy1999.github.io/StockChangeCapture/JSONOutput/May2023.json')
    .then(response => response.json())
    .then(data => {
        // Get the search input and compare button elements
        const stock1Input = document.getElementById('stock1-input');
        const stock2Input = document.getElementById('stock2-input');
        const compareButton = document.getElementById('compare-button');

        // Function to compare two stocks
        function compareStocks(stock1, stock2) {
            // Check if the stocks exist in the data
            if (data.hasOwnProperty(stock1) && data.hasOwnProperty(stock2)) {
                const stock1Data = data[stock1][0];
                const stock2Data = data[stock2][0];

                // Get the keys and values for each stock
                const stock1Keys = Object.keys(stock1Data);
                const stock1Values = Object.values(stock1Data);
                const stock2Keys = Object.keys(stock2Data);
                const stock2Values = Object.values(stock2Data);

                // Create a canvas element for the double bar graph
                const canvas = document.getElementById('chart');

                // Create the double bar graph using Chart.js
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: stock1Keys,
                        datasets: [
                            {
                                label: stock1,
                                data: stock1Values,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                            {
                                label: stock2,
                                data: stock2Values,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            } else {
                console.log('One or both stocks not found');
            }
        }

        // Add event listener to the compare button
        compareButton.addEventListener('click', () => {
            const stock1 = stock1Input.value.trim();
            const stock2 = stock2Input.value.trim();
            compareStocks(stock1, stock2);
        });
    })
    .catch(error => console.error(error));
