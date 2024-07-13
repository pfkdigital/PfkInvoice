package com.pfkdigital.api.utility;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.math.RoundingMode;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class FormatterUtilityTest {

    @InjectMocks
    private FormatterUtility formatterUtility;

    @Test
    void FormatterUtility_GivenBigDecimal_ReturnFormattedString() {
        BigDecimal testValue = BigDecimal.valueOf(10000).setScale(2, RoundingMode.DOWN);
        String formattedString = "10K";

        String actualString = formatterUtility.formatBigDecimal(testValue);

        assertNotNull(actualString);
        assertEquals(actualString,formattedString);
    }
}
