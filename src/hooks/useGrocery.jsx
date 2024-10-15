import { useContext } from "react";
import { GroceryContext } from "../providers/GroceryProvider";

const useGrocery = () => {
    const auth = useContext(GroceryContext);
    return auth;
}

export default useGrocery;
