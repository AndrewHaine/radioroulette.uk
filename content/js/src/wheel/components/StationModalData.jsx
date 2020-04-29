import React from 'react';
import capitalize from 'capitalize';

const StationModalData = props => {
  const { stationData } = props;

  if(!stationData) {
    return <p>No station selected</p>
  }

  const {
    Name,
    URL,
    Image,
    Frequency,
    Description,
    Region,
    Station_Type
  } = stationData;

  const dataPoints = {
    'Frequency': Frequency,
    'Region': capitalize(Region.replace(/-/g, ' ')),
    'Station Type': capitalize(Station_Type.replace(/_/g, ' '))
  };

  return (
    <div className="station-modal">
      {
        Image && <figure className="station-modal__image">
          <img src={Image} alt={`${Name} Logo`}/>
        </figure>
      }
      <div className="station-modal__content">
        <h2>{ Name }</h2>
        <p className="station-modal__description">{ Description }</p>
        <table className="station-modal__table">
          <tbody>
            {
              Object.keys(dataPoints).map(point => {
                const value = dataPoints[point];
                if(value) {
                  return (
                    <tr key={point}>
                      <td>{point}</td>
                      <td>{dataPoints[point]}</td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
        <div className="station-modal__actions">
          <a href={URL} className="btn btn--sm btn--solid-orange" target="_blank" rel="noopener">Listen</a>
        </div>
      </div>
    </div>
  );
};

export default StationModalData;
