
package com.example.mvphemec.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> tratarErroValidacao(
            MethodArgumentNotValidException exception) {
        List<String> mensagens = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(erro -> erro.getDefaultMessage())
                .distinct()
                .toList();

        Map<String, Object> resposta = Map.of(
                "erro", "Erro de validação",
                "status", 400,
                "mensagens", mensagens
        );
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(resposta);
    }
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> tratarErroFormato(
            HttpMessageNotReadableException exception) {

        Map<String, Object> resposta = Map.of(
                "erro", "Erro no formato da requisição",
                "status", 400,
                "mensagens", List.of(
                        "Verifique se o JSON está correto e se os valores possuem os tipos esperados"
                )
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(resposta);
    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> tratarRecursoNaoEncontrado(
            ResponseStatusException exception) {

        HttpStatus status = HttpStatus.valueOf(
                exception.getStatusCode().value()
        );

        Map<String, Object> resposta = Map.of(
                "erro", "Recurso não encontrado",
                "status", status.value(),
                "mensagens", List.of(
                        exception.getReason() != null
                                ? exception.getReason()
                                : "Recurso não encontrado"
                )
        );

        return ResponseEntity
                .status(status)
                .body(resposta);
    }
}
