export const HomeScreen = () => {
  return (
    <div className="home-screen">
      <h2>Welcome to Gaming with JavaScript</h2>
      <p>
        A React app that uses <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
          JavaScript
        </a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
          CSS
        </a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
          HTML
        </a> to build a memory game and a turn-based game that run in a web browser.
      </p>
      <p>
        This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">
          Create React App
        </a>, using the <a href="https://redux.js.org/">
          Redux
        </a> and <a href="https://redux-toolkit.js.org/">
          Redux Toolkit
        </a> template.
      </p>
      <p>
        This site was made with <a href="https://reactjs.org/">
          React
        </a> as well as <a href="https://react-redux.js.org/">
          React Redux
        </a>, and was deployed to <a href="https://www.netlify.com/">
          Netlify
        </a>.
      </p>
      <p>It uses only JavaScript (for the logic and interactivity) and CSS (for the styling and animations), it does not use any other game engines or rendering libraries.</p>
      <p>Navigate to the games using the links in the header.</p>
      <p>The first game is a memory game where the user must match eight pairs of cards, only two cards can be shown at once so the user must remember the locations of previous cards in order to match every pair.</p>
      <p>The second game is a turn-based battle simulator that has the user and enemy character (the javascript logic of the browser) take turns picking one out of three actions to perform.</p>
      <p>Whichever character defeats the opposing character first wins.</p>
    </div>
  );
}
