(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ChartjsPluginA11y = factory());
})(this, (function () { 'use strict';

var state = {
  currentState: {
    datasetIndex: 0,
    index: 0,
  },

  get() {
    return this.currentState;
  },

  set(value) {
    this.currentState = value;
  },

  compare(newState) {
    const datasetIndexMatch =
      this.currentState.datasetIndex === newState.datasetIndex;
    const indexMatch = this.currentState.index === newState.index;

    return datasetIndexMatch && indexMatch;
  },
};

/**
 * @description updates the a11y screen reader element with labelled active points
 * @param {Object} chart
 */
const updateA11yLabel = (chart) => {
  const {datasetIndex, index} = state.get();
  const legendLabel = chart.config.data.datasets[datasetIndex].label;
  const currentLabel = chart.config.data.labels[index];
  const currentValue = chart.config.data.datasets[datasetIndex].data[index];

  document.getElementById(
    'chartjs-a11y-label'
  ).textContent = `${currentLabel}, ${legendLabel},  ${currentValue}`;
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex
 * @param {Number} index
 */
const updateActivePoint = (chart, datasetIndex, index) => {
  chart.setActiveElements([{datasetIndex, index}]);
  chart.tooltip.setActiveElements([{datasetIndex, index}]);
  state.set({datasetIndex, index});
};

/**
 * @description updates state with current activePoint, or set default state if no activePoint exists
 * @param {Object} activePoint
 */
const handleActivePoint = (activePoint) => {
  if (activePoint && !state.get()) {
    state.set(activePoint);
  } else if (activePoint && !state.compare(activePoint)) {
    state.set(activePoint);
  }
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex to start from
 * @returns {Number} next visible datasetIndex
 */
const findNextVisibleDataset = (chart, datasetIndex) => {
  if (datasetIndex === chart.config.data.datasets.length - 1) {
    datasetIndex = 0;
  } else {
    datasetIndex += 1;
  }

  if (chart.isDatasetVisible(datasetIndex)) {
    return datasetIndex;
  }

  return findNextVisibleDataset(chart, datasetIndex);
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex to start from
 * @returns {Number} prev visible datasetIndex
 */
const findPrevVisibleDataset = (chart, datasetIndex) => {
  if (datasetIndex === 0) {
    datasetIndex = chart.config.data.datasets.length - 1;
  } else {
    datasetIndex -= 1;
  }

  if (chart.isDatasetVisible(datasetIndex)) {
    return datasetIndex;
  }

  return findPrevVisibleDataset(chart, datasetIndex);
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex
 * @param {Number} index
 * @param {Number} currentDataset
 * @param {Number} datasetLength
 */
const handleRightKey = (
  chart,
  datasetIndex,
  index,
  currentDataset,
  datasetLength
) => {
  if (!chart.isDatasetVisible(datasetIndex)) {
    const newDatasetIndex = findNextVisibleDataset(chart, datasetIndex);

    updateActivePoint(chart, newDatasetIndex, 0);
  } else if (
    index === currentDataset.data.length - 1 &&
    datasetIndex === datasetLength - 1
  ) {
    updateActivePoint(chart, 0, 0);
  } else if (
    index === currentDataset.data.length - 1 &&
    !chart.isDatasetVisible(datasetIndex + 1)
  ) {
    const newDatasetIndex = findNextVisibleDataset(chart, datasetIndex);

    updateActivePoint(chart, newDatasetIndex, 0);
  } else if (index < currentDataset.data.length - 1) {
    updateActivePoint(chart, datasetIndex, index + 1);
  } else if (datasetLength > 1 && datasetIndex < datasetLength - 1) {
    updateActivePoint(chart, datasetIndex + 1, 0);
  } else {
    updateActivePoint(chart, datasetIndex, 0);
  }
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex
 * @param {Number} index
 * @param {Object} currentDataset
 * @param {Number} datasetLength
 */
const handleLeftKey = (
  chart,
  datasetIndex,
  index,
  currentDataset,
  datasetLength
) => {
  if (!chart.isDatasetVisible(datasetIndex)) {
    const newDatasetIndex = findPrevVisibleDataset(chart, datasetIndex);
    const newDataset = chart.config.data.datasets[newDatasetIndex];

    updateActivePoint(chart, newDatasetIndex, newDataset.data.length - 1);
  } else if (index === 0 && datasetIndex === 0) {
    updateActivePoint(chart, datasetLength - 1, currentDataset.data.length - 1);
  } else if (index === 0 && !chart.isDatasetVisible(datasetIndex - 1)) {
    const newDatasetIndex = findPrevVisibleDataset(chart, datasetIndex);
    const newDataset = chart.config.data.datasets[newDatasetIndex];

    updateActivePoint(chart, newDatasetIndex, newDataset.data.length - 1);
  } else if (index > 0) {
    updateActivePoint(chart, datasetIndex, index - 1);
  } else if (datasetLength > 1 && datasetIndex > 0) {
    const newDataset = chart.config.data.datasets[datasetIndex - 1];

    updateActivePoint(chart, datasetIndex - 1, newDataset.data.length - 1);
  } else {
    updateActivePoint(chart, datasetIndex, currentDataset.data.length - 1);
  }
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex
 * @param {Number} index
 */
const handleUpKey = (chart, datasetIndex, index) => {
  const newDatasetIndex = findPrevVisibleDataset(chart, datasetIndex);

  updateActivePoint(chart, newDatasetIndex, index);
};

/**
 * @param {Object} chart
 * @param {Number} datasetIndex
 * @param {Number} index
 */
const handleDownKey = (chart, datasetIndex, index) => {
  const newDatasetIndex = findNextVisibleDataset(chart, datasetIndex);

  updateActivePoint(chart, newDatasetIndex, index);
};

/**
 * @description creates hidden text element for screen reader
 */
const createA11yElement = () => {
  const a11yElement = document.createElement('div');
  a11yElement.setAttribute('id', 'chartjs-a11y-label');
  // remove from tab order as we only want user to access this via the chart element
  a11yElement.setAttribute('tabindex', '-1');
  a11yElement.setAttribute('role', 'status');
  a11yElement.style.cssText =
    'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
  document.body.appendChild(a11yElement);
};

/**
 * @description sets up plugin
 * @param {Object} chart
 * @param {Object} options
 */
const setup = (chart, options) => {
  const {canvas} = chart;
  // application is a generic role for an interactive UI component
  canvas.setAttribute('role', 'application');
  // make canvas tabbable
  canvas.setAttribute('tabindex', '0');
  // set default AT label
  canvas.setAttribute(
    'aria-label',
    options.chartLabel || `${chart.config._config.type} chart`
  );
  canvas.setAttribute('aria-describedby', 'chartjs-a11y-label');

  canvas.addEventListener('keydown', (event) => {
    const {key} = event;

    if (
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'ArrowUp' ||
      key === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  });

  if (!document.getElementById('chartjs-a11y-label')) {
    createA11yElement();
  }
};

/**
 * @description sets active point when chart receives focus
 * @param {Object} chart
 */
const onFocus = (chart) => {
  if (!state.get()) {
    const datasetIndex = 0;
    const index = 0;

    state.set({datasetIndex, index});
    updateActivePoint(chart, datasetIndex, index);
  }
};

/**
 * @description controls key up events
 * @param {KeyboardEvent} event keyup
 * @param {Object} chart
 */
const onKeyDown = (event, chart) => {
  const {key} = event.native;
  const {datasetIndex, index} = state.get();
  const currentDataset = chart.config._config.data.datasets[datasetIndex];
  const datasetLength = chart.config._config.data.datasets.length;

  if (key === 'ArrowRight') {
    handleRightKey(chart, datasetIndex, index, currentDataset, datasetLength);
  } else if (key === 'ArrowLeft') {
    handleLeftKey(chart, datasetIndex, index, currentDataset, datasetLength);
  } else if (key === 'ArrowUp') {
    handleUpKey(chart, datasetIndex, index);
  } else if (key === 'ArrowDown') {
    handleDownKey(chart, datasetIndex, index);
  }
};

var index = {
  id: 'chartjsPluginA11y',
  start: (chart, args, options) => {
    // add event listeners
    chart.canvas.addEventListener('focus', () => onFocus(chart));
    // setup required elements
    setup(chart, options);
  },
  beforeInit: (chart) => {
    const requiredEvents = [
      'keydown',
      'mousemove',
      'mouseenter',
      'mouseout',
      'click',
    ];

    if (chart.config.options.events) {
      chart.config.options.events = [
        ...new Set([...chart.config.options.events, ...requiredEvents]),
      ];
    } else {
      chart.config.options.events = [...requiredEvents];
    }
  },
  beforeEvent: (chart, args, options) => {
    const {event} = args;

    if (event.type === 'keydown') {
      onKeyDown(event, chart);
    } else {
      // get the current active chart point
      const activePoint = chart.getElementsAtEventForMode(
        event,
        'index',
        {intersect: true},
        true
      )[0];

      handleActivePoint(activePoint);
    }

    updateA11yLabel(chart);
  },
};

return index;

}));
//# sourceMappingURL=chartjs-plugin-a11y.umd.js.map
