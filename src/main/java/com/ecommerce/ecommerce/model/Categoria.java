package com.ecommerce.ecommerce.model;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity 
public class Categoria {
	private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long idCategoria;
	private @NotBlank String casaEConstrucao;
	private @NotBlank String paraLevar;
	private @NotBlank String jardinagem;
	private @NotBlank String higieneECosmeticos;
	public Long getIdCategoria() {
		return idCategoria;
	}
	public String getCasaEConstrucao() {
		return casaEConstrucao;
	}
	public String getParaLevar() {
		return paraLevar;
	}
	public String getHigieneECosmeticos() {
		return higieneECosmeticos;
	}
	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}
	public void setCasaEConstrucao(String casaEConstrucao) {
		this.casaEConstrucao = casaEConstrucao;
	}
	public void setParaLevar(String paraLevar) {
		this.paraLevar = paraLevar;
	}
	public void setHigieneECosmeticos(String higieneECosmeticos) {
		this.higieneECosmeticos = higieneECosmeticos;
	}
	public String getJardinagem() {
		return jardinagem;
	}
	public void setJardinagem(String jardinagem) {
		this.jardinagem = jardinagem;
	} 
	
	
}
