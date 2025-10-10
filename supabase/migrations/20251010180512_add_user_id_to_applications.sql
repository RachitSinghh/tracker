/*
  # Add user authentication to job applications

  1. Changes
    - Add user_id column to job_applications table
    - Link to auth.users table
    - Update RLS policies to be user-specific
    - Ensure users can only see their own applications

  2. Security
    - Drop existing permissive policies
    - Add restrictive policies that check user_id
    - Users can only access their own data
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'job_applications' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE job_applications ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

DROP POLICY IF EXISTS "Anyone can view job applications" ON job_applications;
DROP POLICY IF EXISTS "Anyone can insert job applications" ON job_applications;
DROP POLICY IF EXISTS "Anyone can update job applications" ON job_applications;
DROP POLICY IF EXISTS "Anyone can delete job applications" ON job_applications;

CREATE POLICY "Users can view own applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON job_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON job_applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications"
  ON job_applications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);