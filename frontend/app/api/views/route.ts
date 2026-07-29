import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Отдельный клиент с токеном на запись - основной в lib/sanity.ts только читает
const writeClient = createClient({
  projectId: 'yhtytg6i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const QUERY = `*[_type == "news" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id, views }`;

async function findPost(slug: string) {
  return writeClient.fetch<{ _id: string; views?: number } | null>(QUERY, { slug });
}

// Текущее значение без увеличения - когда просмотр уже засчитан в этой сессии
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  try {
    const post = await findPost(slug);
    if (!post) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json({ views: post.views ?? 0 });
  } catch (error) {
    console.error('❌ Не удалось прочитать счётчик:', error);
    return NextResponse.json({ error: 'error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug required' }, { status: 400 });
    }

    const post = await findPost(slug);
    if (!post) return NextResponse.json({ error: 'not found' }, { status: 404 });

    // Без токена счётчик не растёт, но страница не должна из-за этого падать
    if (!process.env.SANITY_WRITE_TOKEN) {
      console.warn('⚠️ Нет SANITY_WRITE_TOKEN - просмотр не засчитан');
      return NextResponse.json({ views: post.views ?? 0 });
    }

    const updated = await writeClient
      .patch(post._id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ views: updated.views ?? 0 });
  } catch (error) {
    console.error('❌ Не удалось засчитать просмотр:', error);
    return NextResponse.json({ error: 'error' }, { status: 500 });
  }
}
