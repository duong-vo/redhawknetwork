package com.redhawknetwork.controller;

import com.redhawknetwork.service.UserService;
import com.redhawknetwork.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping("/")
	public String index() {
		return "Welcome to the public facing API for the RedhawkNetwork!";
	}

	@PostMapping(value = "/user/add", consumes = {"application/json"})
	public String addUser(@RequestBody User user, RedirectAttributes redirectAttributes) {
		System.out.println(user);
		if (userService.saveOrUpdateUser(user)) {
			redirectAttributes.addFlashAttribute("message", "Save Success");
			return "redirect:/viewUserList";
		}
		System.out.println("failed");
		return "";
	}
}
