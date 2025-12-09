import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

// Get all reviews
app.get('/make-server-c21a4b33/reviews', async (c) => {
  try {
    const reviews = await kv.getByPrefix('review:');
    // Sort by creation time, newest first
    const sortedReviews = reviews.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ reviews: sortedReviews });
  } catch (error) {
    console.log('Error fetching reviews:', error);
    return c.json({ error: 'Failed to fetch reviews', details: String(error) }, 500);
  }
});

// Add a new review
app.post('/make-server-c21a4b33/reviews', async (c) => {
  try {
    const body = await c.req.json();
    const { title, category, rating, content, author } = body;

    if (!title || !category || !rating || !content || !author) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const review = {
      id: Date.now().toString(),
      title,
      category,
      rating: Number(rating),
      content,
      author,
      createdAt: new Date().toISOString().split('T')[0],
    };

    await kv.set(`review:${review.id}`, review);
    return c.json({ review });
  } catch (error) {
    console.log('Error creating review:', error);
    return c.json({ error: 'Failed to create review', details: String(error) }, 500);
  }
});

// Delete a review
app.delete('/make-server-c21a4b33/reviews/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`review:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting review:', error);
    return c.json({ error: 'Failed to delete review', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
