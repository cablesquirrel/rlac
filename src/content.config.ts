import { file, glob } from "astro/loaders";
import { defineCollection, z, reference } from "astro:content";
import type { icons as lucideIcons } from '@iconify-json/lucide/icons.json';
import type { icons as simpleIcons } from '@iconify-json/simple-icons/icons.json';

const other = defineCollection({
  loader: glob({ base: "src/content/other", pattern: "**/*.{md,mdx}" }),
});

const lucideIconSchema = z.object({
  type: z.literal("lucide"),
  name: z.custom<keyof typeof lucideIcons>(),
});

const simpleIconSchema = z.object({
  type: z.literal("simple-icons"),
  name: z.custom<keyof typeof simpleIcons>(),
});

const quickInfo = defineCollection({
  loader: file("src/content/info.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
  })
});

const socials = defineCollection({
  loader: file("src/content/socials.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
    link: z.string().url()
  })
});

const workExperience = defineCollection({
  loader: file("src/content/work.json"),
  schema: z.object({
    id: z.number(),
    company: z.string(),
    duration: z.string(),
    positions: z.array(
        z.object({
            jobTitle: z.string(),
            duties: z.array(z.string())
        })
    ),
    accomplishments: z.array(z.string()),
    skills: z.array(z.string())
  })
});

const education = defineCollection({
    loader: file("src/content/education.json"),
    schema: z.object({
        id: z.number(),
        dates: z.string(),
        school: z.string(),
        location: z.string(),
        degree: z.string()
    })
});

const models3D = defineCollection({
    loader: file("src/content/3dmodels.json"),
    schema: z.object({
        id: z.number(),
        date: z.coerce.date(),
        title: z.string(),
        filename: z.string(),
        design_file: z.string(),
        description: z.string(),
        thingiverse_link: z.string(),
        color: z.string(),
        back_color: z.string(),
        rot_x: z.string(),
        rot_y: z.string(),
        rot_z: z.string(),
        x: z.string(),
        y: z.string(),
        z: z.string(),
        scale_x: z.string(),
        scale_y: z.string(),
        scale_z: z.string(),
        zoom: z.string()
    })
});

const tags = defineCollection({
  loader: file("src/content/tags.json"),
  schema: z.object({
    id: z.string()
  })
});

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    description: z.string(),
    tags: z.array(
      reference("tags")
    ),
    draft: z.boolean().optional().default(false),
    image: image(),
  })
});

const projects = defineCollection({
  loader: glob({ base: "src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: image(),
    link: z.string().url().optional(),
    info: z.array(
      z.object({
        text: z.string(),
        icon: z.union([lucideIconSchema, simpleIconSchema]),
        link: z.string().url().optional(),
      })
    )
  })
});

export const collections = { tags, posts, projects, other, quickInfo, socials, workExperience, education, models3D };