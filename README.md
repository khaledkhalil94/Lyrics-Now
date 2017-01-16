# Lyrics Now
You can use a hosted version of the app from here
http://lyricsnow.us

A simple web app designed for [Last.fm](http://last.fm) users to dynamically fetch and display lyrics according to currently playing songs.
Powered by [Lastfm API](http://www.last.fm/api).

![http://i.imgur.com/beL8wpB.png](http://i.imgur.com/beL8wpB.png)

## Tech Stack
* Front-End/View: [React](https://facebook.github.io/react/)
* State Management: [Redux](http://redux.js.org/docs/introduction/)
* UI: [Semantic-UI](http://semantic-ui.com/)
* Backend: [PHP](http://php.net)
* Development Environment: [create-react-app](https://github.com/facebookincubator/create-react-app)

## Redux-DevTools
To enable Redux Devtools (and Redux-logger), simply enter `/dev` in the input field.

![http://i.imgur.com/B8QpUtr.png](http://i.imgur.com/B8QpUtr.png)

If you don't have Redux-DevTools extension installed, you can add it to Chrome from [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).

## Note
- When you login, your username will be saved in your browser and will be used by default every time you use the app unless you logout.
- the UI poorly supports responsive design, so I would recommend using it on bigger screens.

## Further Work
* Lyrics fetching needs some improving.
* UI needs more adjustments.
* Improve responsive design.