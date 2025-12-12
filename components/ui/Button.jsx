export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm transition " +
        "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 " +
        className
      }
    >
      {children}
    </button>
  );
}
