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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UpdateControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void putRequest_whenPostIsInValid_shouldReturnBadRequest() throws Exception {
        // Create the post
        PostDto newPostDto = TestUtils.createCorrectPostDto();
        // Send new post and save response value
        String response = TestUtils.sendAndSaveNewPostDto(mockMvc, objectMapper.writeValueAsString(newPostDto));

        // Extract the id from the response
        Post createdPost = objectMapper.readValue(response, Post.class);
        Long postId = createdPost.getId();

        mockMvc.perform(put("/posts/" + postId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isBadRequest());
    }

    @Test
    void putRequest_whenPostIsInvalid_shouldReturnNotFound() throws Exception {
        PostDto newPostDto = TestUtils.createCorrectPostDto();
        mockMvc.perform(put("/posts/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPostDto)))
                .andExpect(status().isNotFound());
    }

}
