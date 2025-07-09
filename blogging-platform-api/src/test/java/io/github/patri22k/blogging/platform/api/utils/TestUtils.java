package io.github.patri22k.blogging.platform.api.utils;

import io.github.patri22k.blogging.platform.api.dto.PostDto;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TestUtils {

    public static PostDto createCorrectPostDto() {
        PostDto postDto = new PostDto();

        postDto.setTitle("My First Blog Post");
        postDto.setContent("This is the content of my first blog post.");
        postDto.setCategory("Technology");
        postDto.setTags(List.of("Tech", "Programming"));

        return postDto;
    }

    public static String sendAndSaveNewPostDto(MockMvc mockMvc, String newPostDto) throws Exception {
        return mockMvc.perform(post("/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newPostDto))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();
    }

}
