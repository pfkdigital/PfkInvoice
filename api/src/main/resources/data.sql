-- Insert data into the "clients" table
INSERT INTO clients (id, client_name, client_email, client_street, client_city, client_post_code, client_country)
VALUES
    (1, 'TechCo Enterprises', 'techco@example.com', '123 Main St', 'Techville', '12345', 'United States'),
    (2, 'ABC Marketing Solutions', 'abcmarketing@example.com', '789 Elm Rd', 'Elmville', '98765', 'United States'),
    (3, 'Consulting Experts Inc.', 'experts@example.com', '456 Consulting Ave', 'Consultville', '54321', 'United States'),
    (4, 'Software Innovations Ltd.', 'software@example.com', '789 Tech Road', 'Techville', '67890', 'United States'),
    (5, 'Creative Designs Co.', 'creative@example.com', '222 Design Avenue', 'Designville', '44444', 'United States'),
    (6, 'Shopify E-commerce Solutions', 'shopify@example.com', '555 Shopper''s Lane', 'Shopville', '55555', 'United States'),
    (7, 'ContentWritersPro', 'content@example.com', '123 Content Ave', 'Contentville', '12345', 'United States'),
    (8, 'SEO Masters Inc.', 'seo@example.com', '789 SEO Street', 'SEOVille', '98765', 'United States'),
    (9, 'AppTech Solutions', 'apptech@example.com', '456 App Ave', 'Appville', '54321', 'United States'),
    (10, 'ShutterMasters Photography', 'photography@example.com', '123 Shutter Lane', 'PhotoCity', '12345', 'United States');

-- Insert data into the "invoices" table
INSERT INTO invoices (id, invoice_reference, created_at, payment_due, description, payment_terms, invoice_status, client_id, total)
VALUES
    (1, 'INV-2023-001', '2023-01-15', '2023-02-15', 'Website Redesign', 30, 'Unpaid', 1, 1200.00),
    (2, 'INV-2023-002', '2023-02-10', '2023-03-10', 'Marketing Campaign', 15, 'Paid', 2, 400.00),
    (3, 'INV-2023-003', '2023-03-20', '2023-04-20', 'Consulting Services', 45, 'Unpaid', 3, 2300.00),
    (4, 'INV-2023-004', '2023-04-05', '2023-05-05', 'Software Development', 30, 'Paid', 4, 800.00),
    (5, 'INV-2023-005', '2023-05-10', '2023-06-10', 'Graphic Design Services', 45, 'Unpaid', 5, 1000.00),
    (6, 'INV-2023-006', '2023-06-15', '2023-07-15', 'E-commerce Development', 30, 'Unpaid', 6, 2000.00),
    (7, 'INV-2023-007', '2023-07-05', '2023-08-05', 'Content Writing Services', 15, 'Unpaid', 7, 500.00),
    (8, 'INV-2023-008', '2023-08-20', '2023-09-20', 'SEO Services', 30, 'Paid', 8, 800.00),
    (9, 'INV-2023-009', '2023-09-10', '2023-10-10', 'App Development', 30, 'Unpaid', 9, 2000.00),
    (10, 'INV-2023-010', '2023-10-05', '2023-11-05', 'Photography Services', 15, 'Unpaid', 10, 800.00);

-- Insert data into the "invoice_items" table
INSERT INTO invoice_items (id, name, quantity, price, total, invoice_id)
VALUES
    (1, 'Website Redesign', 1, 800.00, 800.00, 1),
    (2, 'Hosting Service', 1, 400.00, 400.00, 1),
    (3, 'Ad Campaign', 2, 200.00, 400.00, 2),
    (4, 'Strategy Consultation', 1, 1500.00, 1500.00, 3),
    (5, 'Market Research', 1, 800.00, 800.00, 3),
    (6, 'Custom Software Development', 2, 400.00, 800.00, 4),
    (7, 'Logo Design', 1, 600.00, 600.00, 5),
    (8, 'Brochure Design', 1, 400.00, 400.00, 5),
    (9, 'Online Store Setup', 1, 1200.00, 1200.00, 6),
    (10, 'Payment Gateway Integration', 1, 800.00, 800.00, 6),
    (11, 'Blog Post Writing', 5, 100.00, 500.00, 7),
    (12, 'Keyword Optimization', 1, 800.00, 800.00, 8),
    (13, 'Mobile App Development', 1, 2000.00, 2000.00, 9),
    (14, 'Event Photography', 1, 500.00, 500.00, 10),
    (15, 'Portrait Photography', 1, 300.00, 300.00, 10);