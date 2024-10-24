"use client"; // If you're using Next.js 13 with the app directory
import useCheckPermission from 'hooks/useCheckPermission';
import LoadingSpinner from 'comp/Loading'; // Import the loading spinner

const UserRolePage = () => {
    const requiredRole = 'admin'; // Set this to the role you want to check
    const { loading, error } = useCheckPermission(requiredRole);

    // Show loading spinner if loading is true
    if (loading) return <LoadingSpinner />;

    // Show error state if there's an error
    if (error) return <div>Error: {error}</div>; 

    // The main content will only render after loading is false and there are no errors
    return (
        <div>
            <h1>User Role Page</h1>
            <p>Access granted!</p>
        </div>
    );
};

export default UserRolePage;
