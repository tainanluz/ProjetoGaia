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

import Ecommerce.Ecommerce.Model.Produtos;
import Ecommerce.Ecommerce.Repository.ProdutosRepository;


@RestController
@RequestMapping("/Produtos")
@CrossOrigin("*")
public class ProdutoController 
{
	
		private @Autowired ProdutosRepository repositorio;
		
		
		@PostMapping("/Salvar")
		public ResponseEntity<@Valid Produtos> saveProduto (@Valid @RequestBody Produtos BodyProdutos)
		{
			return ResponseEntity.status(201).body(repositorio.save(BodyProdutos));
		}
		
		@GetMapping("/PegarTodos")
		public ResponseEntity<List<Produtos>> pegarTodos()
		{
			return ResponseEntity.status(200).body(repositorio.findAll());
		}

		@GetMapping("/Busca/ID/{BuscaID}")
		public ResponseEntity<Optional<Produtos>> pegarPorID(@Valid @PathVariable(value = "BuscaID") Long BuscaID )
		{
			return ResponseEntity.status(200).body(repositorio.findById(BuscaID));
		}
		
		@DeleteMapping("/DELETE/ID/{DeletarPorID}")
		public void deletarPorID(@Valid @PathVariable(value = "DeletarPorID")Long DeletarPorID)
		{
			repositorio.deleteById(DeletarPorID);
		}
		
		@PutMapping("/Atualiza/{AtualizaProd}")
		public ResponseEntity<Produtos> atualizaProduto (@Valid @RequestBody Produtos AtualizaBody, @PathVariable(value = "AtualizaProd")Long AtualizaProd)
		{		
			if(repositorio.existsById(AtualizaProd)!=false && AtualizaProd==AtualizaBody.getIdProduto())
			{
			return ResponseEntity.status(200).body(repositorio.save(AtualizaBody));
			}else {
				return ResponseEntity.status(203).build();		
				}
		}
		
		@GetMapping("/Pesquisa/Descricao/{PesquisaDesc}")
		public ResponseEntity<List<Produtos>> encontraDescricao (@Valid @PathVariable(value = "PesquisaDesc")String PesquisaDesc)
		{
			return ResponseEntity.status(200).body(repositorio.findAllByDescricaoContainingIgnoreCase(PesquisaDesc));
		} 
}
