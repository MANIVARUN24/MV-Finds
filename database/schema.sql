-- =============================================================================
-- MV Finds — PostgreSQL Database Schema
-- Database: mv_finds
-- =============================================================================

-- Step 1: Create Database (run if not already created)
-- CREATE DATABASE mv_finds;
-- \connect mv_finds;

-- Step 2: Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    why_we_picked_it TEXT,
    image_url VARCHAR(500) NOT NULL,
    product_url TEXT NOT NULL,
    retailer VARCHAR(100) NOT NULL,
    price VARCHAR(50),
    rating NUMERIC(2, 1),
    best_for TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- Step 3: Demonstration Seed Data
INSERT INTO products (
    name, slug, category, description, why_we_picked_it,
    image_url, product_url, retailer, price, rating, best_for, featured, created_at, updated_at
) VALUES 
(
    'Minimal Desk Lamp',
    'minimal-desk-lamp',
    'Study & Desk',
    'A simple desk lamp designed for compact study spaces.',
    'A clean design that works well on a focused study desk.',
    '/products/minimal-desk-lamp.jpg',
    'https://www.amazon.in/dp/B08N5WRWNW',
    'Amazon',
    '',
    NULL,
    'Students and compact desks',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Wireless Mouse',
    'wireless-mouse',
    'Tech Finds',
    'A comfortable wireless mouse for everyday laptop and desk use.',
    'A simple option for people who want a cleaner wireless desk setup.',
    '/products/wireless-mouse.jpg',
    'https://www.amazon.in/dp/B07S92QNYC',
    'Amazon',
    '',
    NULL,
    'Students and everyday laptop users',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Laptop Stand',
    'laptop-stand',
    'Study & Desk',
    'An ergonomic adjustable folding stand that elevates laptops for better study posture.',
    'Sturdy aluminum build that dissipates heat and folds flat for easy backpack transport.',
    '/products/laptop-stand.jpg',
    'https://www.amazon.in/dp/B089K8XW1V',
    'Amazon',
    '',
    NULL,
    'Students and everyday laptop users',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (slug) DO NOTHING;
