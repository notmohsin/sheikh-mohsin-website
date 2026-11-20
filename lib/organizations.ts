import { ORGANIZATIONS } from "@/lib/content/site";
import type { Organization } from "@/lib/content/types";

const lookup = new Map<string, Organization>();
for (const org of ORGANIZATIONS) {
  lookup.set(org.name, org);
  for (const alias of org.aliases ?? []) {
    lookup.set(alias, org);
  }
}

/** The organization registered under a name or one of its aliases. */
export function getOrganization(name: string): Organization | undefined {
  return lookup.get(name);
}
