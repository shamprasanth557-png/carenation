-- CareNation: PostgreSQL Initial Database Migration Schema
-- File: database/migrations/001_initial_schema.sql
-- Description: Creates tables for users, hospitals, first aid topics, doctors, appointments,
-- insurance plans, insurance applications, medicine reminders, and emergency contacts.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Hospitals Table
CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(64) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ta VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL CHECK (type IN ('Government', 'Trust / Non-Profit', 'Private Multi-Specialty')),
    city VARCHAR(100) NOT NULL DEFAULT 'Coimbatore',
    address_en TEXT NOT NULL,
    address_ta TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    emergency_phone VARCHAR(50) NOT NULL,
    specialties_en TEXT[] NOT NULL,
    specialties_ta TEXT[] NOT NULL,
    facilities_en TEXT[] NOT NULL,
    facilities_ta TEXT[] NOT NULL,
    verified_status BOOLEAN NOT NULL DEFAULT TRUE,
    verified_source VARCHAR(255) NOT NULL,
    verified_date DATE NOT NULL,
    map_link TEXT NOT NULL,
    live_bed_status_note_en TEXT NOT NULL,
    live_bed_status_note_ta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. First Aid Topics Table
CREATE TABLE IF NOT EXISTS first_aid_topics (
    id VARCHAR(64) PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_ta VARCHAR(255) NOT NULL,
    icon_name VARCHAR(64) NOT NULL,
    overview_en TEXT NOT NULL,
    overview_ta TEXT NOT NULL,
    warning_signs_en TEXT[] NOT NULL,
    warning_signs_ta TEXT[] NOT NULL,
    steps_en TEXT[] NOT NULL,
    steps_ta TEXT[] NOT NULL,
    donts_en TEXT[] NOT NULL,
    donts_ta TEXT[] NOT NULL,
    when_to_call_108_en TEXT NOT NULL,
    when_to_call_108_ta TEXT NOT NULL,
    medical_source VARCHAR(255) NOT NULL,
    voice_script_en TEXT NOT NULL,
    voice_script_ta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Doctors Directory Table
CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(64) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ta VARCHAR(255) NOT NULL,
    specialty_en VARCHAR(255) NOT NULL,
    specialty_ta VARCHAR(255) NOT NULL,
    hospital_name_en VARCHAR(255) NOT NULL,
    hospital_name_ta VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    experience_years INTEGER NOT NULL,
    available_days_en VARCHAR(255) NOT NULL,
    available_days_ta VARCHAR(255) NOT NULL,
    available_slots TEXT[] NOT NULL,
    consultation_fee VARCHAR(64) NOT NULL,
    consultation_type VARCHAR(64) NOT NULL DEFAULT 'In-Person Consultation',
    is_demo_record BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Appointments Table (Persisted Requests)
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(64) PRIMARY KEY,
    doctor_id VARCHAR(64) REFERENCES doctors(id) ON DELETE SET NULL,
    doctor_name_en VARCHAR(255) NOT NULL,
    doctor_name_ta VARCHAR(255) NOT NULL,
    specialty_en VARCHAR(255) NOT NULL,
    specialty_ta VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(50) NOT NULL,
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Demonstration Confirmed', 'Cancelled')),
    disclaimer_en TEXT NOT NULL,
    disclaimer_ta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Insurance Plans Table
CREATE TABLE IF NOT EXISTS insurance_plans (
    id VARCHAR(64) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ta VARCHAR(255) NOT NULL,
    provider_en VARCHAR(255) NOT NULL,
    provider_ta VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL CHECK (category IN ('Government Health Scheme', 'Public Health Insurance', 'Private Comprehensive')),
    sum_insured_en VARCHAR(255) NOT NULL,
    sum_insured_ta VARCHAR(255) NOT NULL,
    premium_en VARCHAR(255) NOT NULL,
    premium_ta VARCHAR(255) NOT NULL,
    eligibility_en TEXT NOT NULL,
    eligibility_ta TEXT NOT NULL,
    benefits_en TEXT[] NOT NULL,
    benefits_ta TEXT[] NOT NULL,
    waiting_period_en TEXT NOT NULL,
    waiting_period_ta TEXT NOT NULL,
    official_source_url TEXT NOT NULL,
    verified_source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Insurance Assistance Requests Table
CREATE TABLE IF NOT EXISTS insurance_applications (
    id VARCHAR(64) PRIMARY KEY,
    plan_id VARCHAR(64) REFERENCES insurance_plans(id) ON DELETE SET NULL,
    plan_name_en VARCHAR(255) NOT NULL,
    plan_name_ta VARCHAR(255) NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    applicant_phone VARCHAR(20) NOT NULL,
    applicant_aadhaar_or_id VARCHAR(100),
    district VARCHAR(100) NOT NULL DEFAULT 'Coimbatore',
    family_members_count INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(64) NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under review by CareNation', 'More information required', 'Completed by CareNation', 'Cancelled')),
    internal_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Daily Medicine Reminders Table
CREATE TABLE IF NOT EXISTS medicine_reminders (
    id VARCHAR(64) PRIMARY KEY,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    meal_relation VARCHAR(50) NOT NULL CHECK (meal_relation IN ('before_meal', 'after_meal', 'with_meal', 'anytime')),
    days_schedule VARCHAR(50) NOT NULL DEFAULT 'Daily',
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'taken', 'skipped')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performant searching
CREATE INDEX IF NOT EXISTS idx_hospitals_type ON hospitals(type);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty_en);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_insurance_category ON insurance_plans(category);
