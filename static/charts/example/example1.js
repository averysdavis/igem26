const ctx = document.getElementById('myChart');

const massPopChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets: [{
            label: 'Population',
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }
});
