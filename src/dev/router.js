import { err } from "./core";

const router = {
  // Event for route changes
  newRouteEvent: new Event( "newroute" ),

  // Configuration
  routes: undefined,

  // The rendered page
  page: undefined,

  // Transforming a path-string into an array
  getRoute( _path ) {
    let path = _path;

    path = path.replace( /(^\/+|\/+$)/g, "" );
    path = path.split( "/" );

    return path;
  },

  // Updating the page-content according to the routes-object
  routeChange() {

    // Validating the routes object
    if ( !router.routes ) return;
    if ( router.routes.constructor !== Object ) throw err( 9 );

    const route = router.getRoute( window.location.pathname );
    const entries = Object.entries( router.routes );

    for ( let i = 0; i < entries.length; i++ ) {
      const entryRoute = router.getRoute( entries[i][0] );
      let match = true;

      for ( let a = 0; a < entryRoute.length; a++ ) {
        if ( route[a] === undefined || ( entryRoute[a] !== "**" && entryRoute[i] !== route[i] ) ) {
          match = false;
          break;
        }
      }

      if ( match ) {
        router.page = entries[i][1];
        window.dispatchEvent( router.newRouteEvent );
        return;
      }
    }

  },

  // Initializing the router
  init() {
    window.addEventListener( "popstate", router.routeChange );
    router.routeChange();
  },

  // Navigate to a route
  navigate( path ) {
    window.history.pushState( null, path, path );
    router.routeChange();
  }
};

// Initial route change in main file
export default router;