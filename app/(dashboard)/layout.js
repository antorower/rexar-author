import DesktopMenu from "@/components/menu/desktop-menu";
import MobileMenu from "@/components/menu/mobile-menu";

export default function RootLayout({ children }) {
  return (
    <div className={`font-roboto antialiased min-h-screen`}>
      <DesktopMenu />
      <MobileMenu />

      <main className="h-dvh lg:pl-64 pt-16 lg:pt-0">
        <main className="h-full p-6 lg:p-8 space-y-8">{children}</main>
      </main>
    </div>
  );
}
