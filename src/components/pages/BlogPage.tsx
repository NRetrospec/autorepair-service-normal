import { Card, Badge } from '@/components/ui';
import { blogPosts } from '@/data/seedData';
import { Clock, ArrowRight, User } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge variant="info" size="md" className="bg-white/10 text-white border-white/20">Auto Care Blog</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white">Expert Tips & Advice</h1>
          <p className="mt-3 text-primary-200 max-w-xl mx-auto">Stay informed with maintenance tips, industry news, and expert advice from our certified technicians.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map(post => (
              <Card key={post.id} hover className="overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="info" size="md">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm text-dark-500 dark:text-dark-400 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-dark-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
