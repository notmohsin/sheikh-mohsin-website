import ContentPage, {
  contentPageMetadata,
} from "@/components/content-page";
import SpotifyCommand from "@/components/terminal/spotify";

export const metadata = contentPageMetadata({
  title: "Music",
  description:
    "What Sheikh Mohsin is playing, last played, and top tracks and artists.",
  path: "/music",
});

export default function MusicPage() {
  return (
    <ContentPage
      title="music"
      lede="Now playing, or the last track, plus top lists. The terminal prompt stays one line."
    >
      <SpotifyCommand />
    </ContentPage>
  );
}
