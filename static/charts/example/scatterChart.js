const sc = document.getElementById('scatterChart');

// Ensure the canvas element exists before creating the chart
if (sc) {
    const scatter = new Chart(sc, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Example data',
                    data: [
                        { x: 10, y: 20 },
                        { x: 15, y: 10 },
                        { x: 20, y: 25 },
                        { x: 25, y: 5 },
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X value',
                    },
                    min: 0,
                    max: 30,
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y value',
                    },
                    min: 0,
                    max: 30,
                },
            },
        },
    });
}