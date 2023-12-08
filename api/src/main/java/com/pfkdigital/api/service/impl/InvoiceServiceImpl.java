package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.InvoiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
    @Override
    public Invoice getInvoiceById(Integer invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(() -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " does not exist" ));
    }
    @Override
    public String deleteInvoiceById(Integer invoiceId) {
        Invoice invoiceToDelete = invoiceRepository.findById(invoiceId).orElseThrow(() -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " does not exist" ));
        invoiceRepository.delete(invoiceToDelete);

        return "Invoice of id " + invoiceId + " was deleted";
    }
    @Override
    @Transactional
    public Invoice createInvoice(Integer clientId,InvoiceDTO invoiceDto) {
        Invoice newInvoice = InvoiceMapper.INSTANCE.invoiceDtoToInvoice(invoiceDto,clientId);
        return invoiceRepository.save(newInvoice);
    }
}
