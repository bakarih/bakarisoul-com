import { site } from "@/content/site";
import { BookingCTA } from "@/components/ui/BookingCTA";

export function Work() {
  const { hire } = site;

  return <BookingCTA {...hire.creative} />;
}
