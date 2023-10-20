package com.redhawknetwork.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;
import javax.persistence.Column;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
	@Id
	private String email;
	@Column
	private String name;
}
