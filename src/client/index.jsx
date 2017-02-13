
import { darkBlack, grey400, grey100, grey500, white, grey300, fullBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import buildRoutes from '../shared/routes/routes';
import configureStore from '../shared/store';


const snsTheme = getMuiTheme({
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: '#459691',
    primary2Color: '#47ad8a',
    primary3Color: grey400,
    accent1Color: '#c94f49',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#459691',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
  raisedButton: {
    disabledColor: grey300,
  },
  overlay: {
    backgroundColor: '#4376a3',
  },
});

injectTapEventPlugin();

const store = configureStore();
const routes = buildRoutes(store);

render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={snsTheme}>
      {routes}
    </MuiThemeProvider>
  </Provider>
), document.getElementById('react-view'));
