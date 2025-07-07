package io.github.patri22k.blogging.platform.api.repository;

import io.github.patri22k.blogging.platform.api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String title, String content, String category
    );
}
