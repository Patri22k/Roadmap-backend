package io.github.patri22k.blogging.platform.api.service;

import io.github.patri22k.blogging.platform.api.dto.PostDto;
import io.github.patri22k.blogging.platform.api.mapper.PostMapper;
import io.github.patri22k.blogging.platform.api.model.Post;
import io.github.patri22k.blogging.platform.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService extends PostMapper {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public Post createPost(PostDto postDto) {
        Post post = postMapper.fromDto(postDto);
        return postRepository.save(post);
    }

}
