import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { blogPosts, siteMeta } from '../data/content';

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Extract unique tags for filtering
  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))];

  const filteredPosts = selectedTag === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.tags.includes(selectedTag));

  return (
    <section id="blog" className="section section-blog">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="06 / Technical Insights"
            title="Writing on enterprise architecture."
            description="Deep dives into Salesforce platform mechanics, high-performance integration patterns, and custom Lightning development."
          />
        </Reveal>

        {/* Technical Filter Tags */}
        <Reveal className="filter-bar" delay={0.06}>
          {allTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={selectedTag === tag ? 'active' : ''}
            >
              {tag}
            </button>
          ))}
        </Reveal>

        {/* Blog Post Grid */}
        <motion.div layout className="blog-grid">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="blog-card glass-card"
              >
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                
                <div className="blog-tags mb-6">
                  {post.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <a
                  href={`mailto:${siteMeta.email}?subject=Feedback on article: ${post.title}`}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--violet)] mt-auto"
                >
                  <BookOpen size={13} /> Read article 
                  <ArrowUpRight 
                    size={14} 
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                  />
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
