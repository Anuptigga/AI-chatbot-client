import AdminAIStats from "@/components/AdminAIStats";
import Navbar from "@/components/Navbar";

function Stats(){
    return (
      <div>
        <Navbar />
        <div className="flex-1 overflow-y-auto">
        <AdminAIStats />
        </div>
      </div>
    );
}
export default Stats;