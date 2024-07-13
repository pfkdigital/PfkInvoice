package com.pfkdigital.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiError {
  private HttpStatus status;
  private String message;

  @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime timeStamp;
}
