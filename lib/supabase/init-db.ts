import { createServerSupabaseClient } from "./server-client"

export async function initializeSupabaseDatabase() {
  const supabase = createServerSupabaseClient()

  // Create profiles table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID REFERENCES auth.users(id) PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'customer',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Create vehicles table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id) NOT NULL,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      color TEXT,
      license_plate TEXT,
      vin TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Create service_requests table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id) NOT NULL,
      service_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      description TEXT,
      location_lat DOUBLE PRECISION NOT NULL,
      location_lng DOUBLE PRECISION NOT NULL,
      address TEXT,
      vehicle_id UUID REFERENCES vehicles(id),
      assigned_to UUID REFERENCES profiles(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      completed_at TIMESTAMP WITH TIME ZONE
    );
  `)

  // Create emergency_contacts table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS emergency_contacts (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id) NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      relationship TEXT,
      is_primary BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Create memberships table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS memberships (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id) NOT NULL,
      plan TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      auto_renew BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Create payments table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      status TEXT NOT NULL,
      payment_method TEXT,
      description TEXT,
      related_to TEXT,
      related_id UUID,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Create ads table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS ads (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      link_url TEXT,
      position TEXT NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      start_date TIMESTAMP WITH TIME ZONE,
      end_date TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Create home_shield_options table
  await supabase.query(`
    CREATE TABLE IF NOT EXISTS home_shield_options (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      coverage_details JSONB,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  console.log("Supabase database initialized successfully")
}
