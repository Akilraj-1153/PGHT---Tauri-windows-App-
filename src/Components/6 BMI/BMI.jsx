import React from 'react'
import { useState } from 'react';

function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBmi = () => {
    if (height>0 && weight>0) {
      const heightMeters = height / 100;
      const bmiResult = weight / (heightMeters * heightMeters);
      setBmi(bmiResult.toFixed(2));
    }
  };

  const getFoodSuggestion = () => {
    if (bmi) {
      if (bmi < 18.5) {
        return "You're underweight. Try eating more proteins and healthy fats such as nuts, avocados, seeds, whole milk, cheese, yogurt, and fatty fish like salmon and mackerel.";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        return "You're within a healthy weight range. Maintain a balanced diet with plenty of fruits, vegetables, whole grains, lean proteins like chicken breast, turkey, tofu, beans, lentils, and nuts.";
      } else if (bmi >= 25 && bmi < 29.9) {
        return "You're overweight. Focus on portion control, eat more fiber-rich foods like fruits, vegetables, whole grains, and legumes, lean proteins, and healthy fats. Limit processed foods, sugary snacks, and beverages.";
      } else {
        return "You're obese. Consider consulting with a healthcare professional to create a personalized diet and exercise plan. Focus on whole foods like fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugary snacks, and beverages.";
      }
    }
    return '';
  };
  return (
    <div className=' h-[95%] w-[90%] md:w-[80%] lg:h-[80%] lg:w-[70%] rounded-xl p-2 border-2'>
      <h1 className='h-[10%] text-2xl font-mateSc w-full justify-center items-center flex'>BMI CALCULATOR</h1>
      <div className='h-[90%] w-full flex flex-col md:flex-row p-5'>
            <div className='w-full  flex flex-col justify-center items-center h-full '>
            <div className='mb-4'>
            <label className='block text-white mb-2'>Height (cm):</label>
            <input
                type='number'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className='w-full p-2 border border-gray-300 md:w-[70vh] rounded focus:outline-none focus:border-blue-500 text-black'
            />
            </div>
            <div className='mb-4'>
            <label className='block text-white mb-2'>Weight (kg):</label>
            <input
                type='number'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className='w-full p-2 border md:w-[70vh] border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black'
            />
            </div>
            <button
            onClick={calculateBmi}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
            Calculate BMI
            </button>
            {bmi && (
            <div className='mt-4 text-white'>
                <p className='text-lg font-semibold'>Your BMI: {bmi}</p>
                <p className='text-white text-center'>{getFoodSuggestion()}</p>
            </div>
            )}
            </div>
            {/* <div className='w-full md:w-1/4  justify-center flex items-center'>
        <div className='mt-8  text-white'>
          <h3 className='text-xl font-semibold mb-2 align-center flex justify-center items-center'>BMI Categories:</h3>
          <table className='w-full border border-gray-900'>
            <thead>
              <tr className='bg-gray-500'>
                <th className='py-2 px-4 border'>BMI Range</th>
                <th className='py-2 px-4 border'>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-2 px-4 border'>Less than 18.5</td>
                <td className='py-2 px-4 border'>Underweight</td>
              </tr>
              <tr>
                <td className='py-2 px-4 border'>18.5 - 24.9</td>
                <td className='py-2 px-4 border'>Normal weight</td>
              </tr>
              <tr>
                <td className='py-2 px-4 border'>25 - 29.9</td>
                <td className='py-2 px-4 border'>Overweight</td>
              </tr>
              <tr>
                <td className='py-2 px-4 border'>30 or greater</td>
                <td className='py-2 px-4 border'>Obese</td>
              </tr>
            </tbody>
          </table>
        </div>
            </div> */}
      </div>
    </div>
  )
}

export default BMI