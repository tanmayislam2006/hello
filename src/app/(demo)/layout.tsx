import SidebarPanelLayout from "@/components/sidebar-panel/sidebar-panel-layout";
import WalletProtection from "@/components/connect-wallets/wallet-protection";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProtection>
      <SidebarPanelLayout>
        <div className="dark:bg-[#161D26]">{children}</div>
      </SidebarPanelLayout>
    </WalletProtection>
  );
}
