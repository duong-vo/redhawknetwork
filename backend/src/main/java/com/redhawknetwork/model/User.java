package com.redhawknetwork.model;

import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {

	private String email;

	private String name;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
