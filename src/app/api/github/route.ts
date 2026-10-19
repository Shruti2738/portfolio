import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/Shruti2738/repos?sort=pushed&per_page=4",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ repos: [] }, { status: 200 });
    }

    const data = await res.json();
    const repos = (Array.isArray(data) ? data : []).map((repo: {
      name: string;
      html_url: string;
      description: string | null;
      stargazers_count: number;
      language: string | null;
      pushed_at: string;
    }) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      pushedAt: repo.pushed_at,
    }));

    return NextResponse.json({ repos }, { status: 200 });
  } catch (err) {
    // Must fail silently
    console.warn("GitHub fetch failed silently:", err);
    return NextResponse.json({ repos: [] }, { status: 200 });
  }
}
