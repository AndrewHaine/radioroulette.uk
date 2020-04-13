import React, { useEffect, useRef, useState } from 'react';

import defaultSegments from '../lib/segments';
import { loadWheel } from '../lib/canvas';

const App = () => {

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    canvasRef.current.width="1008";
    canvasRef.current.height="1008";

    const canvasContext = canvasRef.current.getContext('2d')

    setCtx(canvasContext);

    loadWheel(canvasContext, defaultSegments);
  }, []);


  return (
    <div className="wheel-application">
      <div className="wheel-application__actions">
        <button className="btn btn--lg btn--hollow-orange">Spin the wheel</button>
      </div>
      <div className="wheel-application__wheel">
        <canvas className="wheel-canvas" ref={canvasRef} />
      </div>
    </div>
  )

};

export default App;
