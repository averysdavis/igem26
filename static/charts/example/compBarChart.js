const cbc = document.getElementById('compBarChart');

const sampleNames = ['1', '2', '3', '4 (joshi)', '5 (k12)', '6 (lb)'];
const inducedData = [3.8, 4.2, 3.5, 5.1, 4.8, 3.2];
const uninducedData = [1.2, 1.5, 1.1, 1.8, 1.6, 1.0];
const patternFill = (shapeType, backgroundColor) =>
    typeof pattern !== 'undefined' && typeof pattern.draw === 'function'
        ? pattern.draw(shapeType, backgroundColor, 'rgba(255, 255, 255, 0.85)', 18)
        : backgroundColor;

if (cbc) {
    const compBarChart = new Chart(cbc, {
        type: 'bar',
        data: {
            labels: sampleNames,
            datasets: [
                {
                    label: 'Induced',
                    data: inducedData,
                    backgroundColor: patternFill('zigzag-horizontal', 'rgb(231, 76, 60)'),
                    borderColor: 'rgba(192, 57, 43, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'Uninduced',
                    data: uninducedData,
                    backgroundColor: patternFill('dot', 'rgba(52, 152, 219, 0.7)'),
                    borderColor: 'rgba(41, 128, 185, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
            scales: {
                x: {
                    stacked: false,
                    title: {
                        display: true,
                        text: 'Sample',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Fluorescence (AU)',
                    },
                },
            },
        },
    });
}
