package Ecommerce.Ecommerce.Model;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@Entity
@Table(name = "Produtos")
@CrossOrigin("*")
public class Produtos 
{
	
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long idProduto;
	private @NotBlank String nome;
	private @NotBlank String marca;
	private @NotNull Float preco;
	private @NotBlank String descricao;
	private @NotNull String link;
	
	@ManyToOne
	@JoinColumn(name = "criador_id")
	@JsonIgnoreProperties({"produtos"})
	private Usuario criador;
	
	@ManyToOne
	@JoinColumn(name = "categoria_id")
	@JsonIgnoreProperties({"produtos"})
	private Categorias categoriaRelacionada;

	public Long getIdProduto() {
		return idProduto;
	}

	public String getNome() {
		return nome;
	}

	public String getMarca() {
		return marca;
	}

	public Float getPreco() {
		return preco;
	}

	public String getDescricao() {
		return descricao;
	}


	public Usuario getCriador() {
		return criador;
	}

	public Categorias getCategoriaRelacionada() {
		return categoriaRelacionada;
	}

	public void setIdProduto(Long idProduto) {
		this.idProduto = idProduto;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public void setPreco(Float preco) {
		this.preco = preco;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void setCriador(Usuario criador) {
		this.criador = criador;
	}

	public void setCategoriaRelacionada(Categorias categoriaRelacionada) {
		this.categoriaRelacionada = categoriaRelacionada;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	

	
}
