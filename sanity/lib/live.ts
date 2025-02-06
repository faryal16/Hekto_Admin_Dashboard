// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "./client";

const token = "skcNCH1lL7wCcDSH6EfLXP2YL4FJaLcejRyoqBUe2be8HAhclbnijNZV7ShqDy7ylZYFQSd45ZiaMENq3uOwFOdscH8B1crFJYKMJyOZ4oOcgZNLKXNxsxj9h4zwSByaZq2M0VhlT3nxiwLy7iTEKOpv9YTvuYDKScwCiVBHFQLqTkK8OuUy"

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
  // client: client.withConfig({
  //   // Live content is currently only available on the experimental API
  //   // https://www.sanity.io/docs/api-versioning
  //   apiVersion: "vX",
  // }),
});