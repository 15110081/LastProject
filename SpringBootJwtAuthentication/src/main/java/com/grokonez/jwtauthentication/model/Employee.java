package com.grokonez.jwtauthentication.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "employee")
public class Employee {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "position")
	@ElementCollection
	@JoinTable(name = "employee_position", joinColumns = @JoinColumn(name = "employee_id"))
	private List<String> positions;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getPositions() {
		return positions;
	}

	public void setPositions(List<String> positions) {
		this.positions = positions;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", position=" + positions + "]";
	}

}
