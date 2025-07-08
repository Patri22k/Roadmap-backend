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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class GetControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getRequest_whenPostIdExists_shouldReturnPost() throws Exception {
        PostDto postDto = TestUtils.createCorrectPostDto();
        String response = TestUtils.sendAndSaveNewPostDto(mockMvc, objectMapper.writeValueAsString(postDto));
        Long postId = objectMapper.readValue(response, Post.class).getId();

        mockMvc.perform(get("/posts/" + postId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getRequest_whenPostIdIsInvalid_shouldReturnNotFound() throws Exception {
        mockMvc.perform(get("/posts/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

}
