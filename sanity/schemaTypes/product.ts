import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export    const product = defineType({
    name: 'product',
    type: 'document',
    title: 'Product',
   icon: TrolleyIcon,
    fields: [
      defineField(
      {
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: (Rule: any) => Rule.required().error('Name is required'),
      }),
      defineField(
      {
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "name",
         
        },
      }),
      defineField(
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true,
        },
        description: 'Upload an image of the product.',
      }),
      defineField(
      {
        name: 'price',
        type: 'number',
        title: 'Price',
        validation: (Rule: any) => Rule.required().error('Price is required'),
      }),
     
      defineField(
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        validation: (Rule: any) =>
          Rule.max(150).warning('Keep the description under 150 characters.'),
      }),
      defineField(
      {
        name: 'discount',
        type: 'number',
        title: 'Discount ',
        validation: (Rule: any) =>
          Rule.min(0).max(100).warning('Discount must be between 0 and 100.'),
      }),
      defineField(
      {
      name: 'priceWithoutDiscount',
      title: 'Price Without Discount',
      type: 'number',
    }),
    defineField(
      {
        name: 'isFeaturedProduct',
        type: 'boolean',
        title: 'Is Featured Product',
      }),
      defineField(
      {
        name: 'stock',
        type: 'number',
        title: 'Stock Level',
        validation: (Rule: any) => Rule.min(0).error('Stock level must be a positive number.'),
      }),
      defineField(
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        options: {
          list: [
            { title: 'Chair', value: 'Chair' },
            { title: 'Sofa', value: 'Sofa' },
          ],
        },
        validation: (Rule: any) => Rule.required().error('Category is required'),
      }),
      defineField({
        name: "status",
        title: "Product Status",
        type: "string",
        options: {
          list: [
            { title: "New", value: "new" },
            { title: "Hot", value: "hot" },
            { title: "Sale", value: "sale" },
          ],
        },
      })
    ],
    preview: {
      select: {
        title: "name",
        media: "image",
        subtitle: "price",
      },
      prepare(selection) {
        return {
          title: selection.title,
          subtitle: `$${selection.subtitle}`,
          media: selection.media,
        };
      },
    },
  });
  
  
  