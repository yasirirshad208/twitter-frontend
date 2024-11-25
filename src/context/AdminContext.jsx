import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    // Function to update the nav status
    const updateNavStatus = (status) => {
        setIsNavOpen(status);
    };

    // Detect screen width and update isNavOpen state accordingly
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 991) {
                setIsNavOpen(false);
            } else {
                setIsNavOpen(true);
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Call handleResize initially to check screen size when component mounts
        handleResize();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <AdminContext.Provider value={{ isNavOpen, updateNavStatus }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    return useContext(AdminContext);
};
