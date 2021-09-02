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

import Ecommerce.Ecommerce.Model.Usuario;
import Ecommerce.Ecommerce.Repository.UsuarioRepository;

@RestController
@RequestMapping("/Usuario")
@CrossOrigin("*")
public class UsuarioController {
	
	private @Autowired UsuarioRepository repositorio;
	
	@PostMapping("/Salvar")
	public ResponseEntity<@Valid Usuario> salvarUsuario (@Valid @RequestBody Usuario BodyUsuario)
	{
		return ResponseEntity.status(203).body(repositorio.save(BodyUsuario));
	}
	
	@GetMapping("/PegarTodos")
	public ResponseEntity<List<Usuario>> getAll()
	{
		return ResponseEntity.status(203).body(repositorio.findAll());
	}

	@GetMapping("/Busca/ID/{BuscaID}")
	public ResponseEntity<Optional<Usuario>> pegarPorID(@Valid @PathVariable(value = "BuscaID") Long BuscaID )
	{
		return ResponseEntity.status(200).body(repositorio.findById(BuscaID));
	}
	
	@DeleteMapping("/DELETE/ID/{DeletarPorID}")
	public void deletarPorID(@Valid @PathVariable(value = "DeletarPorID")Long DeletarPorID)
	{
		repositorio.deleteById(DeletarPorID);
	}
	
	@PutMapping("/Atualiza/{AtualizaProd}")
	public ResponseEntity<Usuario> atualizaUsuario (@Valid @RequestBody Usuario AtualizaBody, @PathVariable(value = "AtualizaProd")Long AtualizaProd)
	{		
		if(repositorio.existsById(AtualizaProd)!=false && AtualizaProd==AtualizaBody.getIdUsuario())
		{
		return ResponseEntity.status(200).body(repositorio.save(AtualizaBody));
		}else {
			return ResponseEntity.status(203).build();		
			}
	}
	
	@GetMapping("/Pesquisa/Descricao/{PesquisaDesc}")
	public ResponseEntity<List<Usuario>> encontraDescricao (@Valid @PathVariable(value = "PesquisaDesc")String PesquisaDesc)
	{
		return ResponseEntity.status(200).body(repositorio.findAllByNomeContainingIgnoreCase(PesquisaDesc));
	}

}
