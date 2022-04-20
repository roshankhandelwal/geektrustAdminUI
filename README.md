# Geektrust ADMIN UI challenge URL
https://www.geektrust.com/coding/detailed/admin-ui

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build-serve`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

Starts a `http-server` on port 8082

Your app is ready to be deployed! \
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Starting off with CRA & typescript

```
yarn create react-app geek-trust-admin-ui --template typescript 
```

Based on this - https://create-react-app.dev/docs/adding-a-sass-stylesheet

```
yarn add sass
```

Adding TailwindCSS support - https://tailwindcss.com/docs/guides/create-react-app
and https://tailwindcss.com/docs/using-with-preprocessors

```
yarn add -D tailwindcss postcss autoprefixer
```

within index.scss

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

React Icons - https://react-icons.github.io/react-icons

```
yarn add react-icons
```

- https://react-icons.github.io/react-icons/search?q=checkbox
- https://dev.to/kevsmss/easiest-way-to-use-icons-in-react-h0o
- https://www.freecodecamp.org/news/how-to-use-react-icons/


## Requirements
1. Column titles must stand out from the entries.
2. There should be a search bar that can filter on any property.
3. You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
4. You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.
5. You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
6. Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows.
