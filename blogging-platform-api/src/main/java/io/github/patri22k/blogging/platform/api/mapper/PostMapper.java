package io.github.patri22k.blogging.platform.api.mapper;

import io.github.patri22k.blogging.platform.api.dto.PostDto;
import io.github.patri22k.blogging.platform.api.model.Post;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@AllArgsConstructor
public class PostMapper {

    private final Validator validator;

    public Post fromDto(PostDto dto) {
        validate(dto);

        return Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .category(dto.getCategory())
                .tags(dto.getTags())
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
    }

    public void updateEntityFromDto(PostDto postDto, Post post) {
        validate(postDto);

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setCategory(postDto.getCategory());
        post.setTags(postDto.getTags());
        post.setUpdatedAt(new Date());
    }

    private void validate(PostDto dto) {
        var violations = validator.validate(dto);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }

}
