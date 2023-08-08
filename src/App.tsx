import React from 'react';

function App() {

  return (
    <div className='vertical-and-spaced'>
      <div>iframe boundary:</div>
      <iframe
        title="Embed"
        src="https://acs-ui-dev-web-calling-hero.azurewebsites.net/"
        height="400px"
        width="500px"
        allow="autoplay *; camera *; microphone *"
      />
    </div>
  );
}

export default App;
