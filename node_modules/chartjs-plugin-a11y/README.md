# chartjs-plugin-a11y.js

An accessibility plugin for Chart.js.

> :warning: **WARNING** This is an early release so may not work for all use cases.

We've done our best at adding as many accessibility features as possible with minimal impact to the core functionality of Chart.js. Whilst this plugin adds improvements chart accessibility programmatically, there are areas such as styles that will still need to be considered when improving the accessibility of your charts.

Always refer to the [WCAG guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) when determining whether an application meets the required accessibility standards for your use case.

Accessibility features this plugin provides:

- Keyboard navigation
- Screen reader announcements

Not provided (you'll need to consider these yourself):

- Enforced colors and color combinations
- Enforced font sizes

## Installation

Make sure you already have [Chart.js](https://www.chartjs.org/) installed.

To install the plugin via npm:

`npm install chartjs-plugin-a11y --save`

## Usage

Import the plugin using ES6 modules syntax:

```javascript
import ChartjsPluginA11y from 'chartjs-plugin-a11y';
```

To register the plugin globally for use in all of your charts you can use the Chart.js register method:

```javascript
Chart.register({ChartjsPluginA11y});
```

Alternatively you can use this plugin with a specific chart:

```javascript
var chart = new Chart(ctx, {
  plugins: [ChartjsPluginA11y],
});
```

## options

Plugin options can be set like so:

```javascript
var chart = new Chart(ctx, {
  plugins: [ChartjsPluginA11y],
  options: {
    plugins: {
      chartjsPluginA11y: {
        // ...
      }
    }
  },
```

The table below shows available configuration options.

| Name       | Type   | Default              | Description                      |
| ---------- | ------ | -------------------- | -------------------------------- |
| chartLabel | string | '`chart.type` chart' | sets canvas element `aria-label` |

## Demo

For examples of usage, see the demo files included within this repository.

## Running

Install dependencies:

```
npm install
```

Build production package:

```
npm run build
```

## License

chartjs-plugin-a11y is available under the [MIT license](https://opensource.org/licenses/MIT).
