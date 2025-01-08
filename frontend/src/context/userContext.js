import React, { createContext, useState, useEffect, useContext } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token userContext",token);
        const response = await fetch('http://localhost:8000/user/info',{
          headers: {
            Authorization: token, // Include the token in the header
          },
        });
        
        const data = await response.json();
        setUser(data.user[0]);
        console.log("user",data.user[0]);
        localStorage.setItem("user",JSON.stringify(data.user[0]));
      } catch (err) {
        setError(err.message);
        console.log("userContext",err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user data in components
export const useUser = () => {
  return useContext(UserContext);
};
