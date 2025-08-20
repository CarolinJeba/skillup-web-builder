import { promises as fs } from 'fs';
import path from 'path';
import { Block, SiteSchema } from '@/lib/types';
import RegistrationForm from '@/components/RegistrationForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function loadSite(slug: string): Promise<SiteSchema | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'sites',
      `${slug}.json`
    );
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as SiteSchema;
  } catch {
    return null;
  }
}

function RenderBlock({ block }: { block: Block }) {
  if (block.type === 'hero') {
    return (
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold mb-2'>{block.title}</h1>
        {block.subtitle && <p className='text-gray-600'>{block.subtitle}</p>}
      </section>
    );
  }
  if (block.type === 'text') {
    return (
      <section className='py-6'>
        <p className='text-lg text-gray-800'>{block.text}</p>
      </section>
    );
  }
  if (block.type === 'image') {
    return (
      <section className='py-6'>
        <img
          src={block.src}
          alt={block.alt ?? ''}
          className='w-full h-auto rounded border'
        />
      </section>
    );
  }
  if (block.type === 'button') {
    return (
      <section className='py-6'>
        <a
          href={block.href}
          className='inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
        >
          {block.label}
        </a>
      </section>
    );
  }
  if (block.type === 'form') {
    return (
      <section className='py-6'>
        <RegistrationForm title={block.title} />
      </section>
    );
  }
  return null;
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await loadSite(slug);
  if (!site) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-gray-600'>Page not found</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen px-6 py-10'>
      <div className='max-w-3xl mx-auto'>
        {site.blocks.map((block) => (
          <RenderBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}
