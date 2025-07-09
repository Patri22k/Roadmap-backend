package io.github.patri22k.blogging.platform.api.exception;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonPropertyOrder({ "timestamp", "status", "error", "message", "path" })
public class ApiError {

    private Date timestamp = new Date();

    private int status;
    private String error;
    private String message;
    private String path;

    public ApiError(int status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

}
