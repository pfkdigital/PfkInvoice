-- You can customize the clients data as needed
INSERT INTO clients (client_name, client_email, client_street, client_city, client_post_code, client_country)
VALUES
    ('ABC Company Inc.', 'contact@abccompany.com', '1234 Oak Street', 'New York', '10001', 'USA'),
    ('XYZ Corporation', 'info@xyzcorp.com', '567 Elm Avenue', 'Los Angeles', '90001', 'USA'),
    ('Smith & Associates', 'info@smithassociates.com', '789 Maple Lane', 'Chicago', '60601', 'USA'),
    ('Tech Solutions Ltd.', 'support@techsolutions.com', '1011 Pine Road', 'San Francisco', '94101', 'USA'),
    ('Global Innovations', 'info@globalinnovations.com', '1313 Cedar Drive', 'Houston', '77001', 'USA'),
    ('Sunrise Industries', 'contact@sunriseindustries.com', '1515 Birch Street', 'Miami', '33101', 'USA'),
    ('MetroTech Inc.', 'info@metrotechinc.com', '1717 Spruce Boulevard', 'Atlanta', '30301', 'USA'),
    ('Atlantic Systems', 'support@atlanticsystems.com', '1919 Willow Court', 'Dallas', '75201', 'USA'),
    ('Eagle Enterprises', 'info@eagleenterprises.com', '2121 Oak Avenue', 'Boston', '02101', 'USA'),
    ('Northwest Solutions', 'contact@northwestsolutions.com', '2323 Elm Road', 'Seattle', '98101', 'USA');

-- You can customize the invoice data as needed
-- Insert 15 invoices with more believable client names and statuses (Paid and Unpaid)
-- You can customize the invoice data as needed
INSERT INTO invoices (invoice_reference, created_at, payment_due, description, payment_terms, invoice_status, total, client_id)
VALUES
    ('INV-001', '2023-01-01', '2023-01-15', 'Web Development Services', 30, 'Unpaid', 1500.00, 1),
    ('INV-002', '2023-01-02', '2023-01-16', 'Graphic Design Work', 30, 'Paid', 1200.00, 1),
    ('INV-003', '2023-01-03', '2023-01-17', 'Consulting Services', 30, 'Unpaid', 1800.00, 2),
    ('INV-004', '2023-01-04', '2023-01-18', 'Software Development', 30, 'Paid', 2200.00, 2),
    ('INV-005', '2023-01-05', '2023-01-19', 'Marketing Campaign', 30, 'Unpaid', 1500.00, 3),
    ('INV-006', '2023-01-06', '2023-01-20', 'IT Support Services', 30, 'Paid', 2500.00, 4),
    ('INV-007', '2023-01-07', '2023-01-21', 'Sales Training Program', 30, 'Unpaid', 1300.00, 4),
    ('INV-008', '2023-01-08', '2023-01-22', 'Product Development', 30, 'Paid', 3000.00, 5),
    ('INV-009', '2023-01-09', '2023-01-23', 'Legal Consultation', 30, 'Unpaid', 1700.00, 6),
    ('INV-010', '2023-01-10', '2023-01-24', 'Marketing Strategy', 30, 'Paid', 4000.00, 7),
    ('INV-011', '2023-01-11', '2023-01-25', 'Financial Analysis', 30, 'Unpaid', 2200.00, 8),
    ('INV-012', '2023-01-12', '2023-01-26', 'Product Launch Campaign', 30, 'Paid', 2800.00, 8),
    ('INV-013', '2023-01-13', '2023-01-27', 'HR Consulting Services', 30, 'Unpaid', 1900.00, 9),
    ('INV-014', '2023-01-14', '2023-01-28', 'Market Research Report', 30, 'Paid', 3500.00, 9),
    ('INV-015', '2023-01-15', '2023-01-29', 'Website Redesign', 30, 'Unpaid', 2400.00, 10);

-- You can customize the data as needed
INSERT INTO invoice_items (name, quantity, price, total, invoice_id)
VALUES
    ('Website Development', 1, 1500.00, 1500.00, 1),
    ('Logo Design', 2, 600.00, 1200.00, 2),
    ('Consulting Hours', 5, 360.00, 1800.00, 3),
    ('Software Development', 2, 1100.00, 2200.00, 4),
    ('Marketing Services', 3, 500.00, 1500.00, 5),
    ('IT Support Hours', 10, 250.00, 2500.00, 6),
    ('Sales Training Program', 1, 1300.00, 1300.00, 7),
    ('Product Development', 1, 3000.00, 3000.00, 8),
    ('Legal Consultation', 2, 850.00, 1700.00, 9),
    ('Marketing Strategy Consultation', 1, 4000.00, 4000.00, 10),
    ('Financial Analysis', 1, 2200.00, 2200.00, 11),
    ('Product Launch Campaign', 2, 1400.00, 2800.00, 12),
    ('HR Consulting Hours', 4, 475.00, 1900.00, 13),
    ('Market Research Report', 1, 3500.00, 3500.00, 14),
    ('Website Redesign', 1, 2400.00, 2400.00, 15),
    ('Web Hosting Service', 1, 100.00, 100.00, 1),
    ('SEO Optimization', 1, 400.00, 400.00, 1),
    ('Brochure Design', 3, 200.00, 600.00, 3),
    ('Market Analysis Report', 1, 1200.00, 1200.00, 3),
    ('Database Management', 2, 750.00, 1500.00, 5),
    ('Social Media Management', 1, 600.00, 600.00, 5),
    ('Hardware Maintenance', 5, 100.00, 500.00, 7),
    ('Software License', 1, 300.00, 300.00, 7),
    ('Prototype Design', 1, 2000.00, 2000.00, 9),
    ('Contract Review', 1, 500.00, 500.00, 9),
    ('Ad Campaign Management', 2, 800.00, 1600.00, 11),
    ('Investment Analysis', 1, 1400.00, 1400.00, 11),
    ('Advertisement Production', 3, 700.00, 2100.00, 13),
    ('Employee Training Program', 2, 450.00, 900.00, 13),
    ('Survey Design', 1, 600.00, 600.00, 15),
    ('Content Management System Setup', 1, 800.00, 800.00, 15);
