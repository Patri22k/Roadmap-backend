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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class DeleteControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deleteRequest_whenPostIsValid_shouldReturnNoContent() throws Exception {
        PostDto newPostDto = TestUtils.createCorrectPostDto();
        String response = TestUtils.sendAndSaveNewPostDto(mockMvc, objectMapper.writeValueAsString(newPostDto));
        Long postId = objectMapper.readValue(response, Post.class).getId();

        mockMvc.perform(delete("/posts/" + postId));
    }

    @Test
    void deleteRequest_whenPostIsInvalid_shouldReturnNotFound() throws Exception {
        mockMvc.perform(delete("/posts/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

}
