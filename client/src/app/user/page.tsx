"use client"; // If you're using Next.js 13 with the app directory
import React from 'react';
import useCheckPermission from 'hooks/useCheckPermission';
import LoadingSpinner from 'comp/Loading'; // Import the loading spinner component

const ProtectedPage = () => {
    const requiredRole = 'user'; // Set this to the role you want to check
    const { loading, error } = useCheckPermission(requiredRole);

    // Show loading spinner and block content
    if (loading) return <LoadingSpinner />;

    // Show error state if there's an error
    if (error) return <div>Error: {error}</div>;

    // Render protected content only when not loading
    return (
        <div>
            <h1>Page not found</h1>
        </div>
    );
};

export default ProtectedPage;
