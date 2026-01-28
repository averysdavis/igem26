const pc = document.getElementById('pieChart');

// Ensure the canvas element exists before creating the chart
if (pc) {
    // Patternomaly is loaded globally as `pattern` (see `static/patternomaly.js`).
    // Signature: pattern.draw(shapeType, backgroundColor, patternColor, size)
    // We wrap it so we can (a) enforce a size, and (b) fall back to solid colors if Patternomaly isn't loaded.
    const patternFill = (shapeType, backgroundColor) =>
        typeof pattern !== 'undefined' && typeof pattern.draw === 'function'
            ? pattern.draw(shapeType, backgroundColor, 'rgba(255, 255, 255, 0.85)', 18)
            : backgroundColor;

    const pie = new Chart(pc, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [
                {
                    label: 'Example dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        patternFill('zigzag-horizontal', 'rgb(255, 99, 132)'),
                        patternFill('dash', 'rgb(54, 162, 235)'),
                        patternFill('dot', 'rgb(255, 205, 86)'),
                    ],
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' },
            },
        },
    });
}