// components/LoadingOverlay.tsx
import Logo from "./Logo";

const LoadingOverlay = ({ message = "Ładowanie, proszę czekać..." }) => {
  return (
    <div className="fixed inset-0 bg-foreground flex flex-col justify-center items-center z-[9999]">
      <Logo bigSize={true} />
      <div className="flex flex-col items-center mt-4">
        <div className="spinner w-12 h-12 border-4 border-foreground border-t-4 border-t-rare rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-background text-center">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
