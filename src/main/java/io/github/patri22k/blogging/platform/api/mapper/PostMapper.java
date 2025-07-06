package io.github.patri22k.blogging.platform.api.mapper;

import io.github.patri22k.blogging.platform.api.dto.PostDto;
import io.github.patri22k.blogging.platform.api.model.Post;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class PostMapper {

    public Post fromDto(PostDto dto) {
        return Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .category(dto.getCategory())
                .tags(dto.getTags())
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
    }

    public PostDto toDto(Post post) {
        return PostDto.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .tags(post.getTags())
                .build();
    }

}
