import SideBar from "./components/Sidebar/SideBar";
import MainContent from "./components/MainContent";
import { useAppSetting } from "@/store/useAppSetting";
import useManageSubscription from "./hook/useManageSubscribion";
import PriceTable from "./components/Subscription/PriceTable";

const Dashboard = () => {
  const { showSubscriptionModal } = useAppSetting();

  useManageSubscription();
  return (
    <div className="h-dvh w-dvw relative overflow-hidden">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="h-screen w-screen overflow-hidden bg-background dark:bg-darkBackground ">
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
      {showSubscriptionModal && <PriceTable />}
    </div>
  );
};

export default Dashboard;
