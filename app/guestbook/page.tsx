import ContentPage, {
  contentPageMetadata,
} from "@/components/content-page";
import GuestbookForm from "@/components/guestbook-form";

export const metadata = contentPageMetadata({
  title: "Guestbook",
  description:
    "Leave Sheikh Mohsin a note. Messages go to email.",
  path: "/guestbook",
});

export default function GuestbookPage() {
  return (
    <ContentPage
      title="guestbook"
      lede="Leave a note. It comes to my email."
    >
      <GuestbookForm />
    </ContentPage>
  );
}
