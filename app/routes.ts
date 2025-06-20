import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/Header.tsx", [
    index("routes/Home.tsx"),
    layout("layouts/Page.tsx", [
      route("/people/:id", "routes/Character.tsx"),
      route("/favorite/", "routes/Favorites.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
