import * as React from 'react';

export const navigationRef = React.createRef();

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param name The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param name The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(name, params) {
  navigationRef.current?.navigate(name, params);
}

export default {
  navigate,
  navigateAndReset
}
