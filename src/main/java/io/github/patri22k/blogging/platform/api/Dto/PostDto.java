package io.github.patri22k.blogging.platform.api.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PostDto {

    private String title;
    private String content;
    private String category;
    private List<String> tags;

}
