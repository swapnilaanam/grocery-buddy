import { useForm } from "react-hook-form";
import useGrocery from "../hooks/useGrocery";

// eslint-disable-next-line react/prop-types
const AddNewItem = ({ setIsAddItemShown, setGroceryList }) => {
    const { getGroceryList, addGroceryList } = useGrocery()

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        const groceryName = data?.name;
        const quantity = data?.quantity;
        const unit = data?.unit;
        const status = 'pending'

        addGroceryList(groceryName, quantity, unit, status);

        const groceryList = getGroceryList();
        setGroceryList(groceryList);

        reset();
        setIsAddItemShown(false);
    }

    return (
        <div className="py-12 fixed top-1/2 xl:top-[58%] -translate-y-1/2 left-1/2 xl:left-[60%] -translate-x-1/2 z-50 w-[300px] md:w-[500px] bg-green-100 rounded-sm drop-shadow-lg">
            <h4 className="text-center text-xl font-medium">
                Add New Grocery
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 mx-5 md:mx-16">
                <div className="mt-6 flex flex-col items-start justify-start gap-4">
                    <label htmlFor="name" className="text-base font-medium">
                        Grocery Name
                    </label>
                    <input
                        {...register("name", { required: true })}
                        type="text" placeholder="Grocery Name..." className="py-4 px-6 w-full border border-black/10 rounded-md"
                    />
                    {errors.email && <span className="text-red-600">** This field is required</span>}
                </div>
                <div className="mt-6 flex flex-col items-start justify-start gap-4">
                    <label htmlFor="quantity" className="text-base font-medium">
                        Quantity
                    </label>
                    <div className="w-full flex justify-between items-center gap-3">
                        <input
                            {...register("quantity", { required: true })}
                            type="number" placeholder="Quantity..." className="py-4 px-6 w-[60%] md:w-[75%] border border-black/10 rounded-md"
                        />
                        <select
                            {...register("unit", { required: true })}
                            defaultValue="Pcs."
                            className="py-4 px-2 w-[35%] md:w-[20%] text-black border border-black/10 rounded-md"
                        >
                            <option value="Pcs.">Pcs.</option>
                            <option value="Kg">Kg</option>
                            <option value="Ltr.">Ltr.</option>
                        </select>
                    </div>
                    {errors.email && <span className="text-red-600">** This field is required</span>}
                </div>
                <div className="mt-8 flex flex-col xl:flex-row justify-center items-center gap-8">
                    <input type="submit" value="Add" className="py-3 px-16 bg-white text-sm md:text-base font-medium border border-black/10 rounded-md drop-shadow-lg cursor-pointer" />
                </div>
            </form>
            <div onClick={() => setIsAddItemShown(false)} className="absolute top-3 right-3 w-7 h-7 flex justify-center items-center bg-red-600 text-white rounded-full cursor-pointer">
                x
            </div>
        </div>
    )
}

export default AddNewItem;