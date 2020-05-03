import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Modal from './Modal.jsx';
import StationModalData from './StationModalData.jsx';

import defaultSegments from '../lib/segments';
import { loadWheel } from '../lib/canvas';

const App = () => {


  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [wheelData, setWheelData] = useState([]);
  const [spinningStatus, setSpinningStatus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  const [stationsModalIsOpen, setStationsModalIsOpen] = useState(false);

  useEffect(() => {
    canvasRef.current.width="1008";
    canvasRef.current.height="1008";

    const canvasContext = canvasRef.current.getContext('2d')

    setCtx(canvasContext);

    loadWheel(canvasContext, defaultSegments);

    setCanvasLoaded(true);

    document.querySelector('#wheel-app').classList.remove('wheel-app-loading');
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
        segment['image'] = null;
        return segment;
      }));
    }
  }, [wheelData]);

  const handleNewClick = e => {
    e.preventDefault();

    setButtonDisabled(true);

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
      window.updateCounts();
      setTimeout(() => {
        setStationsModalIsOpen(true);
        setButtonDisabled(false);
      }, 4500)
    });
  }


  return (
    <Fragment>
      <div className="wheel-application">
        <div className="wheel-application__actions">
          <button disabled={buttonDisabled} className="btn btn--lg btn--hollow-orange" onClick={handleNewClick}>Spin the wheel</button>
        </div>
        <div className='wheel-application__wheel'>
          <div className="wheel-application__wheel-container">
            <span className="wheel-canvas__outer">
              <canvas className={`wheel-canvas ${spinningStatus} wheel-canvas--load${canvasLoaded ? 'ed' : 'ing'}`} ref={canvasRef} />
            </span>
          </div>
        </div>
      </div>
      <Modal
        className="stations-modal"
        title="Station"
        id="stations-modal"
        isOpen={stationsModalIsOpen}
        closeModal={() => setStationsModalIsOpen(false)}
      >
        <StationModalData stationData={wheelData[0]} />
      </Modal>
    </Fragment>
  );
};

export default App;
