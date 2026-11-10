import ContentPage, { contentPageMetadata } from "@/components/content-page";
import Now from "@/components/now";

export const metadata = contentPageMetadata({
  title: "Now",
  description:
    "What Sheikh Mohsin is doing this month: Pune, FLAME, the IIT Ropar internship, and the writing.",
  path: "/now",
});

export default function NowPage() {
  return (
    <ContentPage
      title="now"
      lede="What I am doing this month. Cheap to keep honest, so it is dated."
    >
      <Now />
    </ContentPage>
  );
}
