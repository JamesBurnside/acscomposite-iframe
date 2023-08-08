import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LogContainer } from './LogContainer';
import { Button } from '@mui/material';

const defulatIframeUrl = 'https://jamesburnside-azure-communication-ui-library-6pvjqqjf5q5q-3000.app.github.dev/';

function App() {
  const [callState, setCallState] = useState<any>({});
  
  const logs = useMemo(() => ([
    `page: ${callState.page}`,
    `displayName: ${callState.displayName}`,
    `callId: ${callState.callId}`,
    `remoteParticipants: ${!callState.remoteParticipants ? undefined : JSON.stringify(callState.remoteParticipants)}`,
  ]), [callState]);

  const [iframeUrl, setIframeUrl] = useState(defulatIframeUrl);
  const reloadIframe = (newUrl: string) => {
    if (newUrl !== iframeUrl) {
      setCallState({});
      setIframeUrl(newUrl);
    }
  }

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendToThemeToIframe = (darkMode: boolean) => {
    const data = {
      type: 'embed-customization',
      theme: darkMode ? 'dark' : 'light'
    };
    console.log('sendToThemeToIframe', data, iframeRef.current?.contentWindow);
    iframeRef.current?.contentWindow?.postMessage(data, iframeUrl);
  }
  const sendEndCallEventToIframe = () => {
    const data = {
      type: 'endcall',
    };
    iframeRef.current?.contentWindow?.postMessage(data, iframeUrl);
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent<any>) => {
      console.log('new message!', event);
      if (event.data?.type === 'ACS_STATE_CHANGE') {
        const state = event.data?.state;
        if (!state) return;
        setCallState(state);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    //@ts-ignore
    $( "#resizable" ).resizable();
  }, []);


  return (
    <div className='vertical-and-spaced'>
      <div>iframe url</div>
      <input defaultValue={iframeUrl} id="iframeUrlInput" className='wide' />
      <button className='wide' onClick={() => {
        reloadIframe((document.getElementById("iframeUrlInput") as HTMLInputElement).value);
      }}>reload iframe</button>
      <div id="resizable" className="iframe-container ui-widget-content">
        <iframe
          className="iframe-sizing"
          ref={iframeRef}
          title="Embed"
          src={iframeUrl}
          allow="autoplay *; camera *; microphone *"
        />
      </div>
      <div>customizations:</div>
      <ThemeToggle onChange={sendToThemeToIframe} />
      <Button onClick={sendEndCallEventToIframe} variant="contained" disabled={callState.page !== 'call'}>End call</Button>
      <div>data log:</div>
      <div id="data-log">
        <LogContainer logs={logs} />
      </div>
    </div>
  );
}

export default App;
