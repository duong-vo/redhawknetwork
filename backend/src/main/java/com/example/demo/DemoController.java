package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class DemoController {

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView mdlav = new ModelAndView();
		mdlav.setViewName("index.html");
		return mdlav;
	}

}
