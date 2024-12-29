/*
  # Solar Calculator Database Schema

  1. New Tables
    - `solar_calculations`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `address` (text, required)
      - `roof_length` (numeric, required)
      - `roof_width` (numeric, required)
      - `roof_pitch` (numeric, required)
      - `roof_orientation` (text, required)
      - `panel_count` (integer)
      - `total_wattage` (numeric)
      - `created_at` (timestamp)
    
  2. Security
    - Enable RLS on `solar_calculations` table
    - Add policy for inserting new calculations
    - Add policy for reading own calculations
*/

CREATE TABLE IF NOT EXISTS solar_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  address text NOT NULL,
  roof_length numeric NOT NULL,
  roof_width numeric NOT NULL,
  roof_pitch numeric NOT NULL,
  roof_orientation text NOT NULL,
  panel_count integer,
  total_wattage numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE solar_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert calculations"
  ON solar_calculations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own calculations"
  ON solar_calculations
  FOR SELECT
  TO public
  USING (email = auth.jwt()->>'email');