import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
  { month: 'Enero', ventas: 4000 },
  { month: 'Febrero', ventas: 3000 },
  { month: 'Marzo', ventas: 2000 },
  { month: 'Abril', ventas: 2780 },
];

const Chart = () => (
  <div style={{ height: '500px', width: '700px' }}>  {/* Asegúrate de dar un tamaño al contenedor */}
    <ResponsiveBar
      data={data}
      keys={['ventas']}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Meses',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'prueba',
        legendPosition: 'middle',
        legendOffset: -50,
      }}
    />
  </div>
);

export default Chart;
