package io.github.patri22k.blogging.platform.api.service;

import io.github.patri22k.blogging.platform.api.dto.PostDto;
import io.github.patri22k.blogging.platform.api.mapper.PostMapper;
import io.github.patri22k.blogging.platform.api.model.Post;
import io.github.patri22k.blogging.platform.api.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public Post createPost(PostDto postDto) {
        Post post = postMapper.fromDto(postDto);
        return postRepository.save(post);
    }

    public Post updatePost(long id, PostDto postDto) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post with id " + id + " not found"));

        postMapper.updateEntityFromDto(postDto, existingPost);
        return postRepository.save(existingPost);
    }

    public void deletePost(long id) {
        Post deletePost = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post with id " + id + " not found"));

        postRepository.delete(deletePost);
    }

    public Post getPost(long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post with id " + id + " not found"));
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByTerm(String term) {
        // Better perf
        return postRepository
                .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                        term, term, term
                );

        // My 1st approach
        /*
        List<Post> allPosts = postRepository.findAll();
        return allPosts
                .stream()
                .filter(p ->
                        p.getTitle().contains(term)
                        || p.getContent().contains(term)
                        || p.getCategory().contains(term)
                )
                .toList();
         */
    }

}
