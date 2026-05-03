import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Masjid-E-Maraj app provides prayer times, Quran in Urdu with" },
      { name: "description", content: "Masjid Maraj Connect is a mobile-first web app for Masjid-E-Maraj, offering prayer times, Quran, and Islamic guidance." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Masjid-E-Maraj app provides prayer times, Quran in Urdu with" },
      { property: "og:description", content: "Masjid Maraj Connect is a mobile-first web app for Masjid-E-Maraj, offering prayer times, Quran, and Islamic guidance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Masjid-E-Maraj app provides prayer times, Quran in Urdu with" },
      { name: "twitter:description", content: "Masjid Maraj Connect is a mobile-first web app for Masjid-E-Maraj, offering prayer times, Quran, and Islamic guidance." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9d95c5cf-d395-4262-80ef-c2d11fd2cf1f/id-preview-fa7c3f03--b0ce7093-e009-47a0-aa21-ac1af9214ac4.lovable.app-1777796451158.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9d95c5cf-d395-4262-80ef-c2d11fd2cf1f/id-preview-fa7c3f03--b0ce7093-e009-47a0-aa21-ac1af9214ac4.lovable.app-1777796451158.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
