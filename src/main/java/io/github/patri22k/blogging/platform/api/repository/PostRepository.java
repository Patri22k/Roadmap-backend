package io.github.patri22k.blogging.platform.api.repository;

import io.github.patri22k.blogging.platform.api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
