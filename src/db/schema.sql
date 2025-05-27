-- Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  clerk_user_id TEXT UNIQUE NOT NULL
);

-- Create Templates Table
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT
);

-- Create Resumes Table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  template_id INTEGER REFERENCES templates(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_public BOOLEAN DEFAULT FALSE,
  public_url TEXT,
  last_edited TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Resume_Data Table
CREATE TABLE resume_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  section_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Templates
INSERT INTO templates (name, description, preview_image_url) VALUES
('Minimal', 'Clean, straightforward layout', '/templates/minimal.png'),
('Modern', 'Contemporary design with accent colors', '/templates/modern.png'),
('Elegant', 'Sophisticated layout with subtle design elements', '/templates/elegant.png');

-- Create RLS Policies
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_data ENABLE ROW LEVEL SECURITY;

-- Users Policy (only service role can manage users)
CREATE POLICY "Users are viewable by owners" ON users
  FOR SELECT USING (auth.uid() = clerk_user_id);

-- Resumes Policies
CREATE POLICY "Resumes are viewable by owners" ON resumes
  FOR SELECT USING (
    auth.uid() IN (
      SELECT clerk_user_id FROM users WHERE id = user_id
    )
  );

CREATE POLICY "Resumes are insertable by owners" ON resumes
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT clerk_user_id FROM users WHERE id = user_id
    )
  );

CREATE POLICY "Resumes are updatable by owners" ON resumes
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT clerk_user_id FROM users WHERE id = user_id
    )
  );

CREATE POLICY "Resumes are deletable by owners" ON resumes
  FOR DELETE USING (
    auth.uid() IN (
      SELECT clerk_user_id FROM users WHERE id = user_id
    )
  );

-- Resume Data Policies
CREATE POLICY "Resume data is viewable by resume owners" ON resume_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes r
      JOIN users u ON r.user_id = u.id
      WHERE resume_data.resume_id = r.id
      AND u.clerk_user_id = auth.uid()
    )
  );

CREATE POLICY "Resume data is insertable by resume owners" ON resume_data
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes r
      JOIN users u ON r.user_id = u.id
      WHERE resume_data.resume_id = r.id
      AND u.clerk_user_id = auth.uid()
    )
  );

CREATE POLICY "Resume data is updatable by resume owners" ON resume_data
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM resumes r
      JOIN users u ON r.user_id = u.id
      WHERE resume_data.resume_id = r.id
      AND u.clerk_user_id = auth.uid()
    )
  );

CREATE POLICY "Resume data is deletable by resume owners" ON resume_data
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM resumes r
      JOIN users u ON r.user_id = u.id
      WHERE resume_data.resume_id = r.id
      AND u.clerk_user_id = auth.uid()
    )
  );

-- Public Resume Access Policy
CREATE POLICY "Public resumes are viewable by anyone" ON resumes
  FOR SELECT USING (is_public = TRUE);

-- Create Function for Auto-updating Updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Triggers for Auto-updating Updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON resumes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_data_updated_at
BEFORE UPDATE ON resume_data
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create Trigger for Auto-updating Last_edited on Resumes
CREATE OR REPLACE FUNCTION update_resume_last_edited()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_edited = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_resume_last_edited
BEFORE UPDATE ON resumes
FOR EACH ROW
EXECUTE FUNCTION update_resume_last_edited();
