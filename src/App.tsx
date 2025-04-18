import { useCallback, useEffect, useReducer, useState } from "react";
import { UserProvider } from "./hooks/UserContext";



const initialValue = {
  countInitial :0
}

function UseCount(state , action){
  switch (action.type){
    case 'increment':
      return {countInitial : state.countInitial + 1};
    case 'decrement':
      return {countInitial : state.countInitial - 1};
    case 'reset':
      return {countInitial : 0}   
    default:
      return state;   
  }
}

function App(){
  const [data , setdata] = useState(0);
  const [name , setname] = useState([]);
  const [debounceinput, setdebounceinput] = useState("");
  const [countinput , dispatch] = useReducer(UseCount , initialValue)



  const ondebounce = (fn: (arg0: any) => void, delay: number | undefined) => {
    let timer: number | undefined;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(e);
      }, delay);
    };
  };

  const onThrottle = (fn: (e: React.ChangeEvent<HTMLInputElement>) => void, delay = 300) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
  
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timer) {
        fn(e);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    };
  };
  const handledebounce = (e : any) => {
    console.log(e.target.value)
  }

  const useDebounse = useCallback(ondebounce(handledebounce , 1000),[]);
  const useThrottle = useCallback(onThrottle(handledebounce , 1000),[])

  useEffect(() => {
    console.log("useEffect hook is being run")
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => setname(data))
    .catch((err) => console.log("err" , err))

  } , [data])

  const handleCount = () => {
    setdata(data + 1)
  }

 return(
  <><div>
     <h1>Count</h1>
     <button onClick={handleCount}>count : {data}</button>
     <h1>
       <ul>
         {name.map((user) => (
           <li key={user?.id}>user : {user?.name}</li>
         ))}
       </ul>
     </h1>
     <input onChange={useThrottle} />
     <h1>count :: {countinput.countInitial}</h1>
     <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
     <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
     <button onClick={() => dispatch({ type: 'reset' })}>reset</button>

   </div>
   <div style={
    {
      display: 'flex',
      justifyContent : 'center',
      alignItems : "center",
      height : '100vh'
    }
   }>
    Centered Element
   </div></>
  
 )
}

export default App;