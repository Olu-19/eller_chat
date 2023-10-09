import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";
import MobileFooter from "@/app/components/sidebar/MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-[100vh]">
      <MobileFooter />
      <DesktopSidebar currentUser={currentUser!} />
      <main className="lg:pl-20 h-[100vh]">{children}</main>
    </div>
  );
};

export default Sidebar;
