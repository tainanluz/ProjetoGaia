package Ecommerce.Ecommerce.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "Categorias")
public class Categorias  
{
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long idCategoria;
	private @NotBlank String nomeDaCategoria = "l";
	private @NotBlank String descricaoDaCategoria = "s";
	
	
	
	
	
	public Long getIdCategoria() {
		return idCategoria;
	}
	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}
	public String getNomeDaCategoria() {
		return nomeDaCategoria;
	}
	public void setNomeDaCategoria(String nomeDaCategoria) {
		this.nomeDaCategoria = nomeDaCategoria;
	}
	public String getDescricaoDaCategoria() {
		return descricaoDaCategoria;
	}
	public void setDescricaoDaCategoria(String descricaoDaCategoria) {
		this.descricaoDaCategoria = descricaoDaCategoria;
	}
	
	
	
}
