package com.redhawknetwork.repo;

import com.redhawknetwork.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
