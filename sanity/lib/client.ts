import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,             // This should work now // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl:
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}/studio`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
})
async function fixMissingSlugs() {
  const products = await client.fetch('*[_type == "product" && !defined(slug.current)]');
  console.log(`Found ${products.length} products with missing slugs.`);

  const updates = products.map((product: { _id: String; _type: string; name: string; }) => ({
    _id: product._id,
    _type: product._type,
    slug: {
      _type: 'slug',
      current: product.name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
    },
  }));

  for (const update of updates) {
    await client.createOrReplace(update);
    console.log(`Updated slug for product: ${update._id}`);
  }

  console.log('All missing slugs fixed!');
}

fixMissingSlugs().catch(console.error);