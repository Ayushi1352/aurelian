import NotFoundMessage from "@/components/NotFoundMessage";
import { site } from "@/data";

export default function NotFound() {
  return <NotFoundMessage data={site.notFoundPage} />;
}
