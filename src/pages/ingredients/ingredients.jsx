import IngredientDetails from "../../components/ingredient-details/ingredient-details"
import AppHeader from "../../components/app-header/app-header"
import { useParams } from "react-router"


export function IngredientsPage() {
   
  console.log(useParams)

  return (
    <>
    <AppHeader/>
    
    </>
  )
}