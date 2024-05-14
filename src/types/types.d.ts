export type NavTypes = {
  id: string;
  href: string;
  src: string;
  alt: string;
}[];

export type ThemeTypes = "light" | "dark" | "system";
export interface ContextType {
  theme: ThemeTypes;
  setTheme: (theme: ThemeTypes) => void;
}

export interface DataItem {
  title: string;
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

// {
//   "title": "Beyond Earth",
//   "thumbnail": {
//     "trending": {
//       "small": "./assets/thumbnails/beyond-earth/trending/small.jpg",
//       "large": "./assets/thumbnails/beyond-earth/trending/large.jpg"
//     },
//     "regular": {
//       "small": "./assets/thumbnails/beyond-earth/regular/small.jpg",
//       "medium": "./assets/thumbnails/beyond-earth/regular/medium.jpg",
//       "large": "./assets/thumbnails/beyond-earth/regular/large.jpg"
//     }
//   },
//   "year": 2019,
//   "category": "Movie",
//   "rating": "PG",
//   "isBookmarked": false,
//   "isTrending": true
// },
