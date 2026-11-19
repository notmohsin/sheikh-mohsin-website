import ProfileCard from "@/components/layout/profile-card";
import SiteTabs from "@/components/layout/site-tabs";

/**
 * pbb.sh-style frame for the main pages: a sticky profile column on the left
 * and tabbed pages (About, Experience, Projects, Diary) on the right.
 */
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-0 pt-6 font-mono sm:px-6 md:pt-10 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-10">
      <aside className="mb-8 px-4 sm:px-0 lg:sticky lg:top-10 lg:mb-0">
        <ProfileCard />
      </aside>

      <div className="min-w-0">
        <SiteTabs />
        <main
          id="main-content"
          className="border border-t-0 border-input/70 bg-card/55 px-4 pt-6 pb-12 sm:rounded-b-3xl sm:px-8 sm:pt-8 md:px-10"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
