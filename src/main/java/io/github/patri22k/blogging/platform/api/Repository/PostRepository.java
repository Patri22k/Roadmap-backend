package io.github.patri22k.blogging.platform.api.Repository;

import io.github.patri22k.blogging.platform.api.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
