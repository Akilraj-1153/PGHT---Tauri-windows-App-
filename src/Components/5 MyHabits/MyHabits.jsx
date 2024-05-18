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
import { useEffect } from 'react'
import { getDoc } from 'firebase/firestore'
import HabitReport from '../10 HabitReport/HabitReport'
import { selectedHabitsforReport } from '../../HandleData/atoms'

function MyHabits() {

  const [AllHabits,setAllHabits]= useRecoilState(myHabits)
  const [HabitForReport,setHabitForReport]=useRecoilState(selectedHabitsforReport)

  useEffect(()=>{
    const fetchHabits = async ()=>{
      try{
        const userEmail = JSON.parse(localStorage.getItem('user')).email;
        const userHabitRef =  doc(db, 'HabitDetails', userEmail);
          const userHabitSnapshot = await getDoc(userHabitRef);
          if (userHabitSnapshot.exists()){
            const userHabit = userHabitSnapshot.data();
            setAllHabits(userHabit.Habits)
          }
          else{
          toast.error('User Habits not found!', { autoClose: 2000 });

  
          }
      }
      catch(error){
        toast.error('Failed to fetch Habits!', { autoClose: 2000 });

      }
    }
    fetchHabits()
  },[])
  
  
  

    
    const suggestedHabits = SuggestedHabit.filter(suggestedHabit =>
      Object.keys(AllHabits).includes(suggestedHabit.habit)
    );
  

    const handleReport =(habits)=>{
      setHabitForReport(habits)
    }



  return (
    <div className='h-full w-full justify-center items-center flex'>
<div className="h-[90%] w-[95%] justify-center items-center flex-col flex lg:flex-row text-black gap-5 ">

<div className='xs:h-[20%] xs:w-full lg:h-full lg:w-[30%] rounded-xl  p-2 gap-5 flex flex-col'>
      <div className='h-full w-full rounded-xl border-2 bg-whit p-5'>
        <div className='h-[10%] w-full text-center shadow-xl font-mateSc text-white justify-center  items-center flex '>
          <h1>MY HABITS</h1>
        </div>
        <div className='h-[87%] w-full rounded-b-xl  flex xs:flex-row lg:flex-col bg-whit overflow-scroll p-2'>
        { 
            suggestedHabits.map((habits,index) =>(
              <div key={habits.id} className='text-black text-center p-2 w-full   flex  justify-center items-center'>
                <p  className='gap-10 flex cursor-pointer justify-center items-center xs:w-[20vh] lg:w-[80%] h-full text-center p-2 rounded-lg bg-white shadow-sm shadow-white' onClick={()=>handleReport(habits.habit)}>{habits.habit}</p>
                <p>{index}</p>
                </div>
            ))
          }
        </div>
      </div>

      </div>
        
          <div className='xs:h-[85%] xs:w-full lg:h-full lg:w-[70%] rounded-xl border-2 text-white flex flex-col justify-center gap-5 p-2 items-center'>
            {HabitForReport ? <HabitReport habit={HabitForReport} ></HabitReport> : 

        <div className='text-white'>Select the Habit To view its Report</div>


            }
          </div>
      <ToastContainer ></ToastContainer>
      </div>
    </div>
    
  )
}


export default MyHabits