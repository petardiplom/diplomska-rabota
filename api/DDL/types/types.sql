CREATE TYPE user_role AS ENUM ('admin', 'owner', 'manager', 'staff');
CREATE TYPE staff_role AS ENUM ('owner', 'manager', 'staff');
CREATE TYPE image_type AS ENUM ('profile', 'gallery');
CREATE TYPE reservation_status AS ENUM ('active', 'cancelled');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'waiting_list');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'online');