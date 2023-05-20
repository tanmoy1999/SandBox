window.onload = function() {
    // Fetch JSON data
    fetch('data.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Process and display JSON data
            displayData(data);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
};

function displayData(data) {
    var dataContainer = document.getElementById('data-container');

    // Iterate over each object in the JSON data
    data.forEach(function(item) {
        // Create a new paragraph element to display each item's data
        var paragraph = document.createElement('p');
        paragraph.textContent = 'Name: ' + item.name + ', Age: ' + item.age;

        // Append the paragraph to the data container
        dataContainer.appendChild(paragraph);
    });
}
