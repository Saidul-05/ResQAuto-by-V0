import * as L from "leaflet"

declare module "leaflet" {
  namespace Routing {
    interface RoutingControlOptions {
      waypoints: L.LatLng[]
      router?: any
      routeWhileDragging?: boolean
      showAlternatives?: boolean
      fitSelectedRoutes?: boolean
      show?: boolean
      lineOptions?: any
      createMarker?: (i: number, waypoint: any, n: number) => L.Marker | null
    }

    class Control extends L.Control {
      constructor(options: RoutingControlOptions)
      on(event: string, callback: Function): this
      getPlan(): any
      getRouter(): any
      route(): void
    }

    function control(options: RoutingControlOptions): Control
  }
}
