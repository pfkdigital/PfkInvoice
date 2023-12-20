DROP TABLE IF EXISTS invoice_items;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS clients;

-- Create the clients table
CREATE TABLE clients (
                                       id SERIAL PRIMARY KEY,
                                       client_name VARCHAR(255) NOT NULL,
                                       client_email VARCHAR(255),
                                       client_street VARCHAR(255),
                                       client_city VARCHAR(255),
                                       client_post_code VARCHAR(255),
                                       client_country VARCHAR(255)
);

-- Create the invoices table
CREATE TABLE invoices (
                                        id SERIAL PRIMARY KEY,
                                        invoice_reference VARCHAR(255),
                                        created_at TIMESTAMP,
                                        payment_due TIMESTAMP,
                                        description TEXT,
                                        payment_terms INTEGER,
                                        invoice_status VARCHAR(255),
                                        total NUMERIC(10, 2),
                                        client_id INTEGER,
                                        FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create the invoice_items table
CREATE TABLE invoice_items (
                                             id SERIAL PRIMARY KEY,
                                             name VARCHAR(255),
                                             quantity INTEGER,
                                             price NUMERIC(10, 2),
                                             total NUMERIC(10, 2),
                                             invoice_id INTEGER,
                                             FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
