import { useEffect, useState } from "react";
import { getStats } from "@/services/stats";

function AdminAIStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-bold text-3xl">You are not Authorized !</p>
      </div>
    );

  return (
    <div className="mt-20 p-6 max-w-2xl mx-auto rounded-xl">
      <div className="rounded-lg shadow bg-background p-6 border-2">
        <h2 className="text-xl font-bold mb-6 text-foreground">
          AI Usage Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div>
            <div className="text-sm text-muted-foreground">Total Users</div>
            <div className="text-lg font-bold text-foreground">
              {stats.totalUsers}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Chats</div>
            <div className="text-lg font-bold text-foreground">
              {stats.totalChats}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Prompts</div>
            <div className="text-lg font-bold text-foreground">
              {stats.totalPrompts}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="font-semibold mb-2 text-foreground">
            Most Active Users
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="bg-muted">
                  <th className="py-2 px-3 text-left rounded-l">User ID</th>
                  <th className="py-2 px-3 text-left rounded-r">Chats</th>
                </tr>
              </thead>
              <tbody>
                {stats.mostActiveUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-accent transition">
                    <td className="py-2 px-3 truncate max-w-[120px]">
                      {u._id}
                    </td>
                    <td className="py-2 px-3">{u.chatCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2 text-foreground">Recent Chats</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="bg-muted">
                  <th className="py-2 px-3 text-left rounded-l">Title</th>
                  <th className="py-2 px-3 text-left rounded-r">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentChats.map((c) => (
                  <tr key={c._id} className="hover:bg-accent transition">
                    <td className="py-2 px-3 truncate max-w-[120px]">
                      {c.title}
                    </td>
                    <td className="py-2 px-3">
                      {new Date(c.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAIStats;
