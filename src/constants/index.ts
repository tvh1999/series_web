import { NavTypes } from "@/types/types";

export const NAVIGATION_ITEMS: NavTypes = [
  {
    id: "home-category",
    href: "/",
    src: "/assets/icon-nav-home.svg",
    alt: "Home",
  },
  {
    id: "movie-category",
    href: "/category/movie",
    src: "/assets/icon-nav-movies.svg",
    alt: "Movie",
  },
  {
    id: "series-category",
    href: "/category/tv_series",
    src: "/assets/icon-nav-tv-series.svg",
    alt: "TV series",
  },
  {
    id: "bookmark-category",
    href: "/category/bookmark",
    src: "/assets/icon-nav-bookmark.svg",
    alt: "Bookmark",
  },
];
