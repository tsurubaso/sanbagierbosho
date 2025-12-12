export default function Card({ children, className = "" }) {
  return (
    <div className={"bg-white/90 dark:bg-slate-800 shadow-sm rounded-lg p-4 " + className}>
      {children}
    </div>
  );
}
