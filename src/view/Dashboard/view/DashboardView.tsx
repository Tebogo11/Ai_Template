import GeneratorForm from './GeneratorForm';
import PreviewImage from './PreviewImage/PreviewImage';

function Dashboard() {
  return (
    <div className="flex gap-5 pl-5 lg:pl-10">
      <GeneratorForm />
      <PreviewImage />
    </div>
  );
}

export default Dashboard;
