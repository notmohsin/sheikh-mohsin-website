import ContentPage, {
  contentPageMetadata,
} from "@/components/content-page";
import Uses from "@/components/uses";

export const metadata = contentPageMetadata({
  title: "Uses",
  description:
    "The editor, OS, languages, and research tools Sheikh Mohsin actually uses.",
  path: "/uses",
});

export default function UsesPage() {
  return (
    <ContentPage
      title="uses"
      lede="Editor, system, languages, and the tools the research actually sits in."
    >
      <Uses />
    </ContentPage>
  );
}
