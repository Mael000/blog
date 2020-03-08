const  ReactGA = require( 'react-ga');

ReactGA.initialize('UA-153104468-1');

exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.location.pathname);
 // console.log('test on page '+state.location.pathname);
};