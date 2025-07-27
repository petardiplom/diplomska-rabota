CREATE TYPE user_role AS ENUM ('admin', 'owner', 'manager', 'staff');
CREATE TYPE staff_role AS ENUM ('owner', 'manager', 'staff');
CREATE TYPE image_type AS ENUM ('profile', 'gallery');