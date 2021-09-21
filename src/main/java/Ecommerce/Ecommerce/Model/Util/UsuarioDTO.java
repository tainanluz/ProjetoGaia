package Ecommerce.Ecommerce.Model.Util;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UsuarioDTO {
	
	private @NotBlank @Email String email;
	private @NotBlank String senha;
	
	private Long id;
	private String nome;
	private String token;
	
	public String getEmail() {
		return email;
	}
	public String getSenha() {
		return senha;
	}
	public Long getId() {
		return id;
	}
	public String getNome() {
		return nome;
	}
	public String getToken() {
		return token;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
	
	
	
	
	
	
	

}
