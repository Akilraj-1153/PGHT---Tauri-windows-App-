import React from 'react'
import { SuggestedHabit } from '../../HandleData/Data'
import { useRecoilState } from 'recoil'
import { currentHabit, myHabits } from '../../HandleData/atoms'
import { userEmail } from '../../HandleData/atoms'
import { setDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { db } from '../../Config/Config'
import { collection } from 'firebase/firestore'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddHabits() {

  const [selectedHabits,setSelectedHabits]=useRecoilState(currentHabit)
  const [AllHabits,setAllHabits]= useRecoilState(myHabits)

  console.log(AllHabits)

  console.log(AllHabits)
  
  function handleclick (habitname){
      setSelectedHabits( habitname)
  }

  function handleHabit (event){
      setSelectedHabits(event.target.value)
    }


  async function handlesubmit (){
    if (!selectedHabits.trim()) {
      toast.error('Please enter a habit!', { autoClose: 2000 });
      return;
    }

    if (selectedHabits in AllHabits) {
      toast.error('This habit already exists!', { autoClose: 2000 });
      return;
    }
    const updatedHabits = { ...AllHabits }; 
    console.log(updatedHabits)
    updatedHabits[selectedHabits] = []; 
    setAllHabits(updatedHabits);
    
    try{
      const userEmail = JSON.parse(localStorage.getItem('user')).email;

      const userDetailsCollection = collection(db, "HabitDetails");
      const userDocRef = doc(userDetailsCollection, userEmail);
      await setDoc(userDocRef, {
            Habits:updatedHabits
      });
      toast.success('Habit Added successfully!', { autoClose: 2000 });

    }
    catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to add Habit!', { autoClose: 2000 });

    }
  }
  

  return (
    <div className="h-[90%] w-[95%] justify-center items-center flex-col flex lg:flex-row text-black gap-5">
      <div className='xs:h-[35%] xs:w-full lg:h-full lg:w-[70%] rounded-xl border-2 text-white flex flex-col justify-center gap-5 p-2 items-center'>
      <label className='text-center'>Select the Habit From Suggetions Or enter Manually</label>
      <input className='h-[5vh] rounded-lg text-black p-2' onChange={handleHabit} value={selectedHabits}></input>
      <div className="text-xl  border-2 border-blue-500 p-2 rounded-md w-fit text-blue-500  hover:bg-blue-500 hover:text-white">
      <button onClick={handlesubmit}>Add Habit</button>
      </div>
      </div>
      <div className='xs:h-[65%] xs:w-full lg:h-full lg:w-[30%] rounded-xl  p-2 gap-5 flex flex-col'>
      <div className='h-full w-full rounded-xl border-2 bg-whit'>
        <div className='h-[10%] w-full text-center shadow-xl font-mateSc text-white justify-center items-center flex'>
          <h1>Suggetions</h1>
        </div>
        <div className='h-[87%] w-full rounded-b-xl  bg-whit overflow-scroll p-2'>
        {
            SuggestedHabit.map((habits) =>(
              <div key={habits.id} className='text-black text-center p-2 w-full  flex  justify-center items-center'>
                <p onClick={()=>handleclick(habits.habit)} className='gap-10 flex cursor-pointer justify-center items-center w-[80%] text-center p-2 rounded-lg bg-white shadow-sm shadow-white'>{habits.habit}</p>
                </div>
            ))
          }
        </div>
      </div>

      </div>
      <ToastContainer ></ToastContainer>
      </div>
  )
}


export default AddHabits