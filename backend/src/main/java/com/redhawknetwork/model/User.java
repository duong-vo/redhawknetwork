package com.redhawknetwork.model;

import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;

@Entity
@Table(name="users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
	@Id
	@Column(name = "email")
	private String email;

	@Column(name = "name")
	private String name;

		public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
