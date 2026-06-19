import BottomNav from "../components/BottomNav";


export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-20">
      {children}
      <BottomNav />
    </div>
  );
}