import type { CollectionConfig } from "payload";

export const Posters: CollectionConfig = {
  slug: "posters",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          const revalidateUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=/`;
          await fetch(revalidateUrl, { method: "POST" });
        } catch (error) {
          console.error("Failed to revalidate:", error);
        }
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Designer Name",
    },
    {
      name: "company",
      type: "text",
      required: false,
      label: "Company Name",
    },

    {
      name: "url",
      type: "text",
      required: true,
      label: "Portfolio/Website URL",
      validate: (val: string | null | undefined) => {
        if (!val) return "URL is required";
        try {
          new URL(val);
          return true;
        } catch {
          return "Please enter a valid URL";
        }
      },
    },
    {
      name: "poster",
      type: "relationship",
      relationTo: "media",
      required: true,
      label: "Poster Image",
    },
  ],
};
