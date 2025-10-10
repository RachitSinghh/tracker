/*
  # Create Job Applications Table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `company` (text) - Company name
      - `position` (text) - Job position/role
      - `status` (text) - Application status (Applied, Rejected, etc.)
      - `apply_date` (date) - Date when application was submitted
      - `response_date` (date, nullable) - Date when response was received
      - `job_url` (text, nullable) - URL to the job posting
      - `reason` (text, nullable) - Additional notes or reason
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `job_applications` table
    - Add policy for all users to read all applications
    - Add policy for all users to insert applications
    - Add policy for all users to update applications
    - Add policy for all users to delete applications
*/

CREATE TABLE IF NOT EXISTS job_applications (
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

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job applications"
  ON job_applications
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert job applications"
  ON job_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update job applications"
  ON job_applications
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete job applications"
  ON job_applications
  FOR DELETE
  USING (true);