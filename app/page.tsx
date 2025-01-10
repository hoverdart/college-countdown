import CollegeTable from "./components/CollegeTable";
import NavBar from "./components/nav"
export default function Home() {

  return (
    <>
    <NavBar />
    <div className="p-6 font-[family-name:var(--font-geist-sans)]">
        <CollegeTable />
      </div>
    </>
      
    
  );
}
