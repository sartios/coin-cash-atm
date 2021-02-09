# Structure

The current app has only one screen thus the App component renders it. In case of multiple screens, the App component would render the router and each screen would have its own component.

## index

The index file contains renders the app with a custom material theme.

## App

The only screen of the app including the state. As the app is very small and no shared state is required, redux or context were not used.
