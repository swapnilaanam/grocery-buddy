import { useEffect, useState } from "react";
import AddNewItem from "../components/AddNewItem";
import useGrocery from "../hooks/useGrocery";
import { FaTrash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [isAddItemShown, setIsAddItemShown] = useState(false);

  const { user, loading } = useAuth();
  const { getGroceryList, updateGroceryList } = useGrocery();

  useEffect(() => {
    const groceryList = getGroceryList();

    setGroceryList(groceryList);
  }, [getGroceryList]);

  const handleUpdateGroceryItem = (actionType, groceryName, status) => {
    updateGroceryList(actionType, groceryName, status);

    const groceryList = getGroceryList();
    setGroceryList(groceryList);
  }

  return (
    <section className="my-20 w-full relative">
      <div className="w-full flex justify-center">
        <button onClick={() => setIsAddItemShown(true)} className="px-8 py-2 bg-green-600 text-white font-medium rounded-sm">
          Add Grocery
        </button>
      </div>
      <div className="mt-16 px-4 flex flex-wrap justify-center items-center gap-14">
        {
          (!groceryList || groceryList?.length === 0) && (
            <h4 className="text-center text-sm md:text-xl">
              No grocery item added yet... Add One!
            </h4>
          )
        }
        {
          groceryList?.map((groList, index) => {
            return <div key={index} className="p-3 md:p-7 pt-12 w-full md:w-[350px] h-[220px] bg-green-100 rounded-sm relative">
              <h4 className="text-2xl md:text-3xl font-medium">
                {groList?.groceryName}
              </h4>
              <h4 className="mt-4">
                Quantity: <span className="font-medium capitalize">{groList?.quantity} {groList?.unit}</span>
              </h4>
              <h4 className="mt-4">
                Status: <span className="font-medium capitalize">{groList?.status}</span>
              </h4>

              <div className="absolute top-3 right-3 flex justify-center gap-5">
                <div onClick={() => handleUpdateGroceryItem('add', groList?.groceryName, 'pending')} className="bg-green-600 w-7 h-7 flex justify-center items-center text-white font-medium rounded-full cursor-pointer">
                  +
                </div>
                <div onClick={() => handleUpdateGroceryItem('minus', groList?.groceryName, 'pending')} className="bg-red-600 w-7 h-7 flex justify-center items-center text-white font-medium rounded-full cursor-pointer">
                  -
                </div>
                <div onClick={() => handleUpdateGroceryItem('remove', groList?.groceryName, 'pending')} className="bg-red-600 w-7 h-7 flex justify-center items-center text-white font-medium rounded-full cursor-pointer">
                  <FaTrash />
                </div>
              </div>
              <button onClick={() => handleUpdateGroceryItem('status', groList?.groceryName, 'Bought')} className="py-2 px-6 absolute bottom-0 right-0 bg-white border-b border-r border-green-200 rounded-sm">Mark As Bought</button>
            </div>
          })
        }
      </div>
      {
        (!loading && !user) && (
          <h4 className="absolute -top-16 right-2 md:right-3 lg:right-5 w-full text-wrap text-right">
            <b className="text-[8px] md:text-base">Important:</b>
            <span className="ml-2 text-[8px] md:text-base text-wrap">
              To store personal grocery list kindly login.
            </span>
          </h4>
        )
      }
      {
        isAddItemShown && <AddNewItem setIsAddItemShown={setIsAddItemShown} setGroceryList={setGroceryList} />
      }
    </section>
  )
}

export default Dashboard;