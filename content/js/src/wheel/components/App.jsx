import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import defaultSegments from '../lib/segments';
import { loadWheel } from '../lib/canvas';

const App = () => {

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [wheelData, setWheelData] = useState([]);
  const [spinningStatus, setSpinningStatus] = useState(null);

  useEffect(() => {
    canvasRef.current.width="1008";
    canvasRef.current.height="1008";

    const canvasContext = canvasRef.current.getContext('2d')

    setCtx(canvasContext);

    loadWheel(canvasContext, defaultSegments);
  }, []);

  useEffect(() => {
    if(!ctx) return;

    if(wheelData.length) {
      loadWheel(ctx, defaultSegments.map((segment, i) => {
        const station = wheelData[i];
        segment['color'] = station['Color'] || '#1B1B1C';
        segment['image'] = station['Image'] || 'text';
        segment['name'] = station['Name'];
        return segment;
      }));
    } else {
      loadWheel(ctx, defaultSegments.map(segment => {
        // defaultSegments is being overridden with the wheel data??
        segment['image'] = null;
        return segment;
      }));
    }
  }, [wheelData]);

  const handleNewClick = e => {
    e.preventDefault();
    setWheelData([]);
    setSpinningStatus('spinning');
    axios.post('/api/v1/newSpin', {
      date: new Date()
    }).then(({ data }) => {
      setTimeout(() => {
        setWheelData(data);
      }, 200);
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      setTimeout(() => setSpinningStatus('spun'), 500);
    });
  }


  return (
    <div className="wheel-application">
      <div className="wheel-application__actions">
        <button className="btn btn--lg btn--hollow-orange" onClick={handleNewClick}>Spin the wheel</button>
      </div>
      <div className='wheel-application__wheel'>
        <div className="wheel-application__wheel-container">
          <canvas className={`wheel-canvas ${spinningStatus}`} ref={canvasRef} />
        </div>
      </div>
    </div>
  )

};

export default App;
