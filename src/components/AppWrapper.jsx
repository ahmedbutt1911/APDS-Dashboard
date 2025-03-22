import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

const AppWrapper = ({ child }) => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        {child}
      </main>
    </div>
  );
};

export default AppWrapper;
