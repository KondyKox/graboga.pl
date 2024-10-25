// components/LoadingOverlay.tsx
import Image from 'next/image'; // Import Image from Next.js if you are using Next.js

const LoadingOverlay = ({ message = "Ładowanie, proszę czekać..." }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <Image 
                src="/logo.png" // Replace with the path to your logo
                alt="Logo"
                width={150} // Adjust the width as needed
                height={150} // Adjust the height as needed
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="spinner" style={{
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 2s linear infinite',
                    marginBottom: '16px' // Space between spinner and message
                }} />
                <p style={{
                    fontSize: '18px', // Adjust font size
                    color: '#333', // Text color
                    textAlign: 'center' // Center align the text
                }}>{message}</p>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingOverlay;
