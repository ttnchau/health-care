import React, { useState } from 'react';

function BMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(2);
    let status = '';
    if (bmi < 18.5) status = 'Gầy';
    else if (bmi < 25) status = 'Bình thường';
    else if (bmi < 30) status = 'Thừa cân';
    else status = 'Béo phì';
    setResult(`${bmi} (${status})`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tính BMI</h2>
      <input
        type="number"
        placeholder="Cân nặng (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      /><br />
      <input
        type="number"
        placeholder="Chiều cao (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      /><br />
      <button onClick={calculateBMI}>Tính</button>
      {result && <p>Kết quả BMI: {result}</p>}
    </div>
  );
}

export default BMI;
