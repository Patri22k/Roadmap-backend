package io.github.patri22k.blogging.platform.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.patri22k.blogging.platform.api.dto.PostDto;
import io.github.patri22k.blogging.platform.api.model.Post;
import io.github.patri22k.blogging.platform.api.utils.TestUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.contains;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PostControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void postRequest_whenPostIsValid_shouldReturnCreatedStatus() throws Exception {
        PostDto newPostDto = TestUtils.createCorrectPostDto();

        mockMvc.perform(post("/posts")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(newPostDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("My First Blog Post"))
                .andExpect(jsonPath("$.content").value("This is the content of my first blog post."))
                .andExpect(jsonPath("$.category").value("Technology"))
                .andExpect(jsonPath("$.tags", contains("Tech", "Programming")));
    }

    @Test
    void postRequest_whenPostIsInvalid_shouldReturnBadRequest() throws Exception {
        Post invalidPost = new Post();
        invalidPost.setCategory("Technology");

        mockMvc.perform(post("/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidPost)))
                .andExpect(status().isBadRequest());
    }

}
