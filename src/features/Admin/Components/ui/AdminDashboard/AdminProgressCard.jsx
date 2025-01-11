
import ProgressCard from '../../../../../Components/ui/ProgressCard';
import { IconUsersGroup,IconQuestionMark,IconListCheck } from '@tabler/icons-react';
function AdminProgressCard() {
  const adminStats = [
    { title: "Total Users", progress: 70, count: 120, bgColor: "bg-primaryClr", icon: <IconUsersGroup /> ,value:50},
    { title: "Tasks Completed", progress: 85, count: 340, bgColor: "bg-primaryClr", icon: <IconListCheck /> ,value:20},
    { title: "Questions Managed", progress: 50, count: 45, bgColor: "bg-primaryClr", icon: <IconQuestionMark /> ,value:70},
  
  ];
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          {adminStats.map((item, index) => (
            <ProgressCard
              key={index}
              title={item.title}
              progress={item.progress}
              count={item.count}
              bgColor={item.bgColor}
              icon={item.icon}
              value={item.value}
            />
          ))}
        </div>
      );
}

export default AdminProgressCard