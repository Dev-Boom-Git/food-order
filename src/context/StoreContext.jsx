import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก API จริง
    fetch("https://67deedb9471aaaa742862985.mockapi.io/Foods")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setMenuData(data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  const contextValue = {
    menuData,
    setMenuData, // หากต้องการให้ component ลูกสามารถแก้ไขข้อมูลได้
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
