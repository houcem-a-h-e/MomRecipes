import { Search} from "lucide-react"
import RecipeCard from "../RecipeCard"
import { useEffect, useState } from "react"
import { getRandomColor } from "../../lib/utils";



const Homepage = () => {
  const apiKey = import.meta.env.VITE_APP_KEY;
  const apiId = import.meta.env.VITE_APP_ID;
  const [recipes,setRecipes]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchRecipes=async(searchQuery)=>{
    setLoading(true);
    setRecipes([]);
    try{
      const res=await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${apiId}&app_key=${apiKey}&q=${searchQuery}&type=public`)
      const data=await res.json();
      setRecipes(data.hits);
      console.log(data.hits);
    }
    catch(error){
      console.log(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchRecipes("chicken");
  },[])

  const handleSearchRecipe=(e)=>{
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  }


  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"}/>
            <input type="text" className="text-sm md:text-md grow " 
            placeholder="what do you want to cook today"/>
          </label>
        </form>
        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading && recipes.map(({recipe},index)=>(
            <RecipeCard key={index} recipe={recipe}
            {...getRandomColor()}
            />
          ))}
         {loading && [...Array(9).map((_,index)=>(
          <div key={index} className="flex flex-col gap-4 w-52">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
         ))]}
        </div>

      </div>
    </div>
  )
}
export default Homepage