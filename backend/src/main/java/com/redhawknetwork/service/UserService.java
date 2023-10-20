package com.redhawknetwork.service;

import com.redhawknetwork.repo.UserRepository;
import com.redhawknetwork.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;

	public boolean saveOrUpdateUser(User user) {
		User updatedUser = userRepo.save(user);

		if (userRepo.findByEmail(updatedUser.getEmail()) != null) {
			return true;
		}
		return false;
	}
}
