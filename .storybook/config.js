import { configure, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { themes } from '@storybook/theming';

const req = require.context('../src/stories', true, /\.stories\.js$/);

// Option defaults.
//  light: ThemeVars;
//  dark: ThemeVars;
//  normal: ThemeVars;
addParameters({
  options: {
    theme: themes.light,
  },
});

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
