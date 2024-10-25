// Tooltip for icons
const Tooltip: React.FC<{ children: string }> = ({ children }) => {
  return (
    <span className="absolute bottom-[-1.5rem] text-xs text-rare opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {children}
    </span>
  );
};

export default Tooltip;
