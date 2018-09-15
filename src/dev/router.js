import { err } from "./core";

const router = {
    newRouteEvent: new Event( "newroute" ),
    routes: undefined,
    page: undefined,

    getRoute( _path ) {
        let path = _path;
        path = path.replace( /(^\/+|\/+$)/g, "" );
        path = path.split( "/" );

        return path;
    },

    routeChange() {
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

    init() {
        window.addEventListener( "popstate", router.routeChange );
        router.routeChange();
    },

    navigate( path ) {
        window.history.pushState( null, path, path );
        router.routeChange();
    }
};

// Initial route change in main file
export default router;