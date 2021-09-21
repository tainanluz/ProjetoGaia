package Ecommerce.Ecommerce.Controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ecommerce.Ecommerce.Model.Categorias;
import Ecommerce.Ecommerce.Repository.CategoryRepository;

@RestController
@RequestMapping("/Categorias")
@CrossOrigin("*")


public class CategoriaController 
{
	private @Autowired CategoryRepository repositorio;
	
	
	@PostMapping("/Salvar")
	public ResponseEntity<Categorias> saveCategoria (@Valid @RequestBody Categorias BodyCategorias)
	{
		return ResponseEntity.status(201).body(repositorio.save(BodyCategorias));
	}
	
	@GetMapping("/PegarTodos")
	public ResponseEntity<List<Categorias>> pegarTodos()
	{
		return ResponseEntity.status(200).body(repositorio.findAll());
	}
 
	@GetMapping("/Busca/ID/{BuscaID}")
	public ResponseEntity<Optional<Categorias>> pegarPorID(@Valid @PathVariable(value = "BuscaID") Long BuscaID )
	{
		return ResponseEntity.status(200).body(repositorio.findById(BuscaID));
	}
	
	
	@DeleteMapping("/DELETE/ID/{DeletarPorID}")
	public void deletarPorID(@Valid @PathVariable(value = "DeletarPorID")Long DeletarPorID)
	{
		repositorio.deleteById(DeletarPorID);
	}
	 
	@PutMapping("/Atualiza/{AtualizaCat}")
	public ResponseEntity<@Valid Categorias> atualizaCategoria (@Valid @RequestBody Categorias AtualizaBody, @PathVariable(value = "AtualizaCat")Long AtualizaCat)
	{		
		if(repositorio.existsById(AtualizaCat)!=false && AtualizaCat==AtualizaBody.getIdCategoria())
		{
		return ResponseEntity.status(200).body(repositorio.save(AtualizaBody));
		}else {
			return ResponseEntity.status(206).build();		
			}
} 
	
	@GetMapping("/Pesquisa/Nome/{PegaNome}")
	public ResponseEntity<List<Categorias>> PesquisaNome(@PathVariable(value = "PegaNome")String PegaNome)
	{
		return ResponseEntity.status(200).body(repositorio.findAllByNomeDaCategoriaContainingIgnoreCase(PegaNome));	
	}
}
