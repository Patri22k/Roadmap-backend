package io.github.patri22k.blogging.platform.api.Service;

import io.github.patri22k.blogging.platform.api.Dto.PostDto;
import io.github.patri22k.blogging.platform.api.Mapper.PostMapper;
import io.github.patri22k.blogging.platform.api.Model.Post;
import io.github.patri22k.blogging.platform.api.Repository.PostRepository;
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
