// Chart.jsx
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { id: 'Santorini', label: 'Santorini', value: 300 },
  { id: 'Mykonos', label: 'Mykonos', value: 12 },
  { id: 'Zafiro', label: 'Zafiro', value: 42 },
  { id: 'Prado Piamonte', label: 'Prado Piamonte', value: 12 },
  { id: 'Coral', label: 'Coral', value: 12 },
  { id: 'Punta Arena', label: 'Punta Arena', value: 42 },
];

const Chart = () => (
  <div style={{ height: '500px', width: '700px' }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: 'color' }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
    />
  </div>
);

export default Chart;
