// OpenNext Cloudflare adapter config. This site is fully static (RSC, no
// server actions or ISR), so no incremental cache is configured — the
// default in-worker behavior is sufficient.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
