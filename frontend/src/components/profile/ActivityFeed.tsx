const ActivityFeed = () => {
    // Dummy data for recent activity
    const activities = [
      {
        id: 1,
        type: "coding",
        description: "Worked on Project X for 2 hours",
        date: "2024-10-15",
      },
      {
        id: 2,
        type: "collaboration",
        description: "Paired with @user123 on a TypeScript project",
        date: "2024-10-14",
      },
      {
        id: 3,
        type: "coding",
        description: "Solved 5 LeetCode problems",
        date: "2024-10-13",
      },
      {
        id: 4,
        type: "achievement",
        description: "Earned the 'JavaScript Master' badge",
        date: "2024-10-12",
      },
    ];
  
    return (
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ActivityFeed;