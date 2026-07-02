import SideBar from './components/Sidebar/SideBar';
import MainContent from './view';
import { useAppSetting } from '@/store/useAppSetting';
import useManageSubscription from './hooks/useManageSubscribion';
import PriceTable from './components/Subscription/PriceTable';

const Dashboard = () => {
  const { showSubscriptionModal } = useAppSetting();

  useManageSubscription();
  return (
    <div className="relative h-full overflow-hidden">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="bg-background dark:bg-darkBackground h-screen w-screen overflow-hidden">
            <MainContent />
          </div>
        </div>
        <div className="drawer-side">
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
