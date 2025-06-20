### Assignment Accomplishments

- All the requirements provided has been completed including the bonus.
- As a part of the requirement the API did not work with necessary data such as films, starships etc and based on the discussion started using https://swapi.info/api

- As a part of the API we get the data in a single shot and also it does not have search API.
  Hence based on the condition of the API the approach I took is:
  -- CLient Side routing
  -- Maintiang the entire data on client side using Zustand as the store
  -- Favoriting and removal of favoriting also on Zustand.
  -- Pagination is client side.
  -- Search is also on client along with autosuggestion.
  -- Have taken the liberty to add addition data on the UI to make it more populated.
  -- While moving to character detail page retrieving data from store if present rather than API.

### Tech Stack

| \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ \_ |
| React | |
| Typescript | |
| React Router v7 | Routing |
| Zustand | Store |
| Tailwind CSS | Styling |
| Vitest | Testing |
| React Query | API Cache |

---

### Known Issue

- Favorites does not persist on reload - Zustand has a middleware persist to do the same but did not feel confident on the implementation as I was short of time.
- Search and reload page with query does not populate the page - A conditional is preventing the initial data fetch to happen but given some more time I will be able to work around it.
- For height basic number validation is present - Tried multiple regex but it failed but can be done with keyup event handling. Currently wrong data such as 000 and 1.2 can be added but this can be handled.

### Improvement Plan

- SSR for character detail page - Need to do some R and D for Zustand to work on SSR but since.
- Some of the components are not completely done so making them a bit more robust.
- If we consider the star wars workflow this can becomre a microfrontend on its own with all the APIs and any new addition such as authentication, favorite being a seperate workflow can be made into a seperate microfrontend.
- I have not added any gaurd rails for quality maintainance such as ESLint, TSLint, CSS Lint etc which can be configured to the pre-commit hook using Husky for quality maintaince.
- Meta Tags in character page for better SEO.
- Since all the components were primitive I built them on my own but there may be a battle tested barebone component library which we can use in future.
- Better design for more intuitive experience.
- Better test coverage - I tried to cover one flow with components, container and page.

### Steps to start locally

## Installation

Install the dependencies:

```bash
npm install
```

## Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.
