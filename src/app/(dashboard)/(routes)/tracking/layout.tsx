import getTrackings from "@/app/actions/getTrackings";
import getUsers from "@/app/actions/getUsers";
// import Sidebar from "../components/sidebar/Sidebar";
// import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    
    <div>
      <div className="h-full">
        {/* <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
        /> */}
        
        {children}
      </div>
    </div>
  );
}