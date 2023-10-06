package com.example.demo;

import java.io.File;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class StaticResourceConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
      registry
          .addResourceHandler("/**")
          .addResourceLocations("file:" + new File(".").getAbsolutePath().replace("backend\\.","frontend\\public\\").replace("\\","/"));
        Set<String> files = listFilesUsingJavaIO(new File(".").getAbsolutePath().replace("backend\\.","frontend\\public\\"));
        for (String file : files) {
            System.out.println(new File(".").getAbsolutePath().replace("backend\\.","frontend\\public\\").replace("\\","/")+file);
        }
    }

    public Set<String> listFilesUsingJavaIO(String dir) {
        return Stream.of(new File(dir).listFiles())
          .filter(file -> !file.isDirectory())
          .map(File::getName)
          .collect(Collectors.toSet());
    }
}
