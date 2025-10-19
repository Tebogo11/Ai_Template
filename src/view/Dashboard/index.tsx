import { useAppSetting } from "@/store/useAppSetting";
import SideBar from "./components/Sidebar/SideBar";
import MainContent from "./components/MainContent";

const Dashboard = () => {
  const { theme } = useAppSetting();
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="min-h-screen max-h-[80vh] overflow-hidden bg-background dark:bg-darkBackground flex ">
          <MainContent />
        </div>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        >
          <p>close</p>
        </label>
        <SideBar />
      </div>
    </div>
  );
};

export default Dashboard;
