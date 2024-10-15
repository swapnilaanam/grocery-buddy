import { createContext } from "react"
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export const GroceryContext = createContext(null);

// eslint-disable-next-line react/prop-types
const GroceryProvider = ({ children }) => {
    const { user } = useAuth();

    const getGroceryList = () => {
        const userName = user?.displayName || 'guest';

        const groceryLists = JSON.parse(localStorage.getItem('groceryLists'));
        const groceryList = groceryLists?.find((groList) => groList?.userName === userName);
        return groceryList?.groceryItems;
    };

    const updateGroceryList = (actionType, groceryName, status) => {
        const userName = user?.displayName || 'guest';

        const groceryLists = JSON.parse(localStorage.getItem('groceryLists'));

        const groceryList = groceryLists.find((groList) => groList?.userName === userName);

        if (actionType === 'add') {
            const updatedGroceryItems = groceryList?.groceryItems?.map((groceryItem) => {
                if (groceryItem?.groceryName === groceryName) {
                    groceryItem.quantity = groceryItem?.quantity + 1;
                }
                return groceryItem;
            });

            const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

            const updatedGroceryLists = [...prevGroceryList, {
                userName,
                groceryItems: updatedGroceryItems
            }];

            localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));

        } else if (actionType === 'minus') {
            const updatedGroceryItems = groceryList?.groceryItems?.map((groceryItem) => {
                if (groceryItem?.groceryName === groceryName) {
                    if (groceryItem?.quantity === 1) {
                        toast.error('Not Possible! Instead use remove option!');
                    } else {
                        groceryItem.quantity = groceryItem?.quantity - 1;
                    }
                }
                return groceryItem;
            });

            const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

            const updatedGroceryLists = [...prevGroceryList, {
                userName,
                groceryItems: updatedGroceryItems
            }];

            localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));

        } else if (actionType === "remove") {
            const updatedGroceryItems = groceryList?.groceryItems?.filter((groceryItem) => groceryItem?.groceryName !== groceryName);

            const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

            const updatedGroceryLists = [...prevGroceryList, {
                userName,
                groceryItems: updatedGroceryItems
            }];

            localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));

        } else if (actionType === 'status') {
            const updatedGroceryItems = groceryList?.groceryItems?.map((groceryItem) => {
                if (groceryItem?.groceryName === groceryName) {
                    groceryItem.status = status
                }
                return groceryItem;
            });

            const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

            const updatedGroceryLists = [...prevGroceryList, {
                userName,
                groceryItems: updatedGroceryItems
            }];

            localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));
        }
    };

    const addGroceryList = (groceryName, quantity, unit, status) => {
        const localStorage = window.localStorage;

        const userName = user?.displayName || 'guest';

        const prevData = localStorage.getItem('groceryLists');

        if (prevData) {
            const groceryLists = JSON.parse(prevData);

            const isUserExist = groceryLists.find((groList) => groList?.userName === userName);

            if (isUserExist) {
                const isItemExist = isUserExist?.groceryItems?.find((groceryItem) => groceryItem?.groceryName === groceryName);

                if (isItemExist) {
                    const updatedGroceryItems = isUserExist?.groceryItems?.map((groceryItem) => {
                        if (groceryItem?.groceryName === groceryName) {
                            groceryItem.quantity = Number(groceryItem?.quantity) + Number(quantity)
                        }
                        return groceryItem;
                    });

                    const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

                    const updatedGroceryLists = [...prevGroceryList, {
                        userName,
                        groceryItems: updatedGroceryItems
                    }];

                    localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));
                } else {
                    const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

                    const updateGroceryItems = [...(isUserExist.groceryItems), { groceryName, quantity: Number(quantity), unit, status }];

                    const updatedGroceryLists = [...prevGroceryList, {
                        userName,
                        groceryItems: updateGroceryItems
                    }];

                    localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));
                }
            } else {
                const prevGroceryList = groceryLists?.filter((groList) => groList?.userName !== userName);

                const updatedGroceryLists = [...prevGroceryList, {
                    userName,
                    groceryItems: [
                        {
                            groceryName,
                            quantity: Number(quantity),
                            unit,
                            status
                        }
                    ]
                }];

                localStorage.setItem('groceryLists', JSON.stringify(updatedGroceryLists));
            }
        } else {
            localStorage.setItem('groceryLists', JSON.stringify([{
                userName,
                groceryItems: [
                    {
                        groceryName,
                        quantity: Number(quantity),
                        unit,
                        status
                    }
                ]
            }]));
        }
    };

    const groceryInfo = {
        getGroceryList,
        addGroceryList,
        updateGroceryList
    }

    return (
        <GroceryContext.Provider value={groceryInfo}>
            {children}
        </GroceryContext.Provider>
    )
}

export default GroceryProvider;