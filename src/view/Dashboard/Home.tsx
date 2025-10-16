import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";

function Home() {
  return (
    <div className="min-h-screen max-h-[80vh] overflow-hidden bg-background dark:bg-darkBackground flex ">
      <MainContent />
    </div>
  );
}

export default Home;
