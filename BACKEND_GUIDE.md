# Backend Implementation Guide

This project uses **Supabase** as the backend, which provides:
- PostgreSQL database
- REST API (auto-generated)
- Real-time subscriptions
- Row Level Security (RLS)

## Database Schema

The `job_applications` table has been created with the following structure:

```sql
CREATE TABLE job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  status text NOT NULL DEFAULT 'Applied',
  apply_date date NOT NULL DEFAULT CURRENT_DATE,
  response_date date,
  job_url text,
  reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Security

Row Level Security (RLS) is enabled with policies that allow anyone to:
- View all applications
- Insert new applications
- Update existing applications
- Delete applications

## API Operations

The frontend connects to Supabase using the `@supabase/supabase-js` client library. All CRUD operations are handled through:

### 1. **Fetch Applications**
```typescript
const { data, error } = await supabase
  .from('job_applications')
  .select('*')
  .order('apply_date', { ascending: false });
```

### 2. **Create Application**
```typescript
const { data, error } = await supabase
  .from('job_applications')
  .insert([{ company, position, status, ... }])
  .select()
  .single();
```

### 3. **Update Application**
```typescript
const { error } = await supabase
  .from('job_applications')
  .update({ status, updated_at: new Date().toISOString() })
  .eq('id', id);
```

### 4. **Delete Application**
```typescript
const { error } = await supabase
  .from('job_applications')
  .delete()
  .eq('id', id);
```

## Extending the Backend

If you want to add more features, you can:

1. **Add new tables** - Create additional migrations for related data
2. **Add triggers** - Set up automatic timestamp updates or custom logic
3. **Add Edge Functions** - Create serverless functions for complex operations
4. **Add authentication** - Enable user accounts and private job tracking
5. **Add real-time features** - Subscribe to changes in the database

## Environment Variables

Make sure your `.env` file contains:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are automatically configured and available in your Supabase project dashboard.
