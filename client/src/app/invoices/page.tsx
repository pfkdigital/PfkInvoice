import React from 'react'
import InvoiceTable from '../ui/InvoiceTable/InvoiceTable'
import {invoicesHeaders} from '../lib/tableHeaders'
import {getAllInvoices} from '../lib/api-functions'

const InvoicePage = async () => {
    const invoices = await getAllInvoices()
    return invoices && <InvoiceTable headers={invoicesHeaders} invoices={invoices}/>
}

export default InvoicePage