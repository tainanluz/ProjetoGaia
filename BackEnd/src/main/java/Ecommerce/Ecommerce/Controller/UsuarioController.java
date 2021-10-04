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
import Ecommerce.Ecommerce.Model.Util.UsuarioDTO;
import Ecommerce.Ecommerce.Repository.UsuarioRepository;
import Ecommerce.Ecommerce.Servicos.UsuarioServicos;

@RestController
@RequestMapping("/Usuario") 
@CrossOrigin("*")
public class UsuarioController {
	
	private @Autowired UsuarioRepository repositorio;
	private @Autowired UsuarioServicos servicos;
	
	@PostMapping("/salvar")
	public ResponseEntity<Object> salvar(@Valid @RequestBody Usuario novoUsuario) {
		Optional<Object> objetoOptional = servicos.cadastrarUsuario(novoUsuario);

		if (objetoOptional.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			return ResponseEntity.status(201).body(objetoOptional.get());
		}
	}
	
	@PutMapping("/Alterar")
	public ResponseEntity<Object> alterarUsuario(@Valid @RequestBody UsuarioDTO usuarioParaAlterar) {
		Optional<?> objetoAlterado = servicos.alterarUsuario(usuarioParaAlterar);

		if (objetoAlterado.isPresent()) {
			return ResponseEntity.status(201).body(objetoAlterado.get());
		} else {
			return ResponseEntity.status(400).build();
		}
	}
	/*
	 * Metodo para pesquisar todos os usuarios
	 * @since 1.0
	 * @author grupo 3
	 */
	
	@GetMapping("/Pesquisa/Todos")
	public ResponseEntity<List<Usuario>> getAll()
	{
		return ResponseEntity.status(203).body(repositorio.findAll());
	}

	@GetMapping("/Pesquisa/Id/{BuscaID}")
	public ResponseEntity<Optional<Usuario>> pegarPorID(@Valid @PathVariable(value = "BuscaID") Long BuscaID )
	{
		return ResponseEntity.status(200).body(repositorio.findById(BuscaID));
	}
	
	@DeleteMapping("/Delete/Id/{DeletarPorID}")
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
	
	@PutMapping("/credenciais")
	public ResponseEntity<Object> credenciais(@Valid @RequestBody UsuarioDTO usuarioParaAutenticar){
		Optional<?> objetoOptional = servicos.pegarCredenciais(usuarioParaAutenticar);
		
		if (objetoOptional.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			return ResponseEntity.status(201).body(objetoOptional.get());
		}
	}

	@GetMapping("/Pesquisa/Descricao/{PesquisaDesc}")
	public ResponseEntity<List<Usuario>> encontraDescricao (@Valid @PathVariable(value = "PesquisaDesc")String PesquisaDesc)
	{
		return ResponseEntity.status(200).body(repositorio.findAllByNomeContainingIgnoreCase(PesquisaDesc));
	}

}
