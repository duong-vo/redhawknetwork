package com.redhawknetwork.controller;

import com.redhawknetwork.service.UserService;
import com.redhawknetwork.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/user/add")
	public String addUser(User user, RedirectAttributes redirectAttributes) {
		if (userService.saveOrUpdateUser(user)) {
			redirectAttributes.addFlashAttribute("message", "Save Success");
			return "redirect:/viewUserList";
		}
		System.out.println("failed");
		return "";
	}
}
