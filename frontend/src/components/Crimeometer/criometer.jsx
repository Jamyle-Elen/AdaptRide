// // src/components/Crimeometer.jsx
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const Crimeometer = ({ crimeData }) => {
//   const data = {
//     labels: crimeData.map((data) => data.area), // Áreas do mapa
//     datasets: [
//       {
//         label: 'Número de Crimes',
//         data: crimeData.map((data) => data.crimeCount), // Contagem de crimes
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return `Crimes: ${tooltipItem.raw}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: '100%', height: '300px' }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default Crimeometer;
