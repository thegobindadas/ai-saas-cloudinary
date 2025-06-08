# 📹 MediaMorph - A Fullstack SaaS Video & Image Processing App

MediaMorph is a fullstack SaaS application built with Next.js and Clerk, enabling users to sign up, upload videos, compress & download them using Cloudinary, and transform images to popular social media formats like Instagram, Twitter, and Facebook.

---

## ✨ Features

- 🔐 **Authentication** via [Clerk](https://clerk.dev/) (Sign up, Sign in, Logout)
- 📤 **Video Upload** with title and description
- 📦 **Video Compression** using [Cloudinary](https://cloudinary.com/) + `next-cloudinary`
- 🏠 **Home Page** listing all uploaded videos
- 🖼️ **Image Upload & Transformation** to:
  - Instagram Square (1:1)
  - Instagram Portrait (4:5)
  - Twitter Post (16:9)
  - Twitter Header (3:1)
  - Facebook Cover (205:78)
- ⚙️ **Fullstack SaaS stack**: TypeScript, Prisma, NeonDB, Cloudinary, Next-cloudinary, Clerk, Next.js, DaisyUI

---

## 🧱 Tech Stack

| Category          | Tech Used                          |
|-------------------|------------------------------------|
| Frontend          | [Next.js (App Router)](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) |
| Backend           | [Prisma ORM](https://www.prisma.io/) |
| Database          | [NeonDB (PostgreSQL)](https://neon.tech/) |
| Authentication    | [Clerk](https://clerk.com/) |
| Media Handling    | [Cloudinary](https://cloudinary.com/) + [Next-cloudinary](https://next.cloudinary.dev/) |
| UI Framework      | [DaisyUI](https://daisyui.com/) + [Tailwind CSS](https://tailwindcss.com/) |
| Utilities         | [dayjs](https://www.npmjs.com/package/dayjs), [filesize](https://www.npmjs.com/package/filesize), [lucide-react](https://lucide.dev/guide/packages/lucide-react) |

