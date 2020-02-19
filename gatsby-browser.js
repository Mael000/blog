const  ReactGA = require( 'react-ga');

ReactGA.initialize('GTM-W6KBN79');
exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.location.pathname);
 // console.log('test on page '+state.location.pathname);
};