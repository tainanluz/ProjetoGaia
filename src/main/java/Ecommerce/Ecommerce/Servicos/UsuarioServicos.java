package Ecommerce.Ecommerce.Servicos;

import java.util.Optional;
import java.nio.charset.Charset;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import Ecommerce.Ecommerce.Model.Usuario;
import Ecommerce.Ecommerce.Model.Util.UsuarioDTO;
import Ecommerce.Ecommerce.Repository.UsuarioRepository;

@Service
public class UsuarioServicos 
{
	private @Autowired UsuarioRepository repositorio;
	
	public Optional<Object> cadastrarUsuario(Usuario novoUsuario){
		return repositorio.findByEmailIgnoreCase(novoUsuario.getEmail()).map(usuarioExistente -> {
			return Optional.empty();
		}).orElseGet(() -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String result = encoder.encode(novoUsuario.getSenha());
			novoUsuario.setSenha(result);
			return Optional.ofNullable(repositorio.save(novoUsuario));
		});
	}
	
	
	public Optional<?> pegarCredenciais(UsuarioDTO usuarioParaAutenticar) {
		return repositorio.findByEmailIgnoreCase(usuarioParaAutenticar.getEmail()).map(usuarioExistente -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

			if (encoder.matches(usuarioParaAutenticar.getSenha(), usuarioExistente.getSenha())) {

				String estruturaBasic = usuarioParaAutenticar.getEmail() + ":" + usuarioParaAutenticar.getSenha(); // gustavoboaz@gmail.com:134652
				byte[] autorizacaoBase64 = Base64.encodeBase64(estruturaBasic.getBytes(Charset.forName("US-ASCII"))); // hHJyigo-o+i7%0ÍUG465sas=-
				String autorizacaoHeader = "Basic " + new String(autorizacaoBase64); // Basic hHJyigo-o+i7%0ÍUG465sas=-

				usuarioParaAutenticar.setToken(autorizacaoHeader);
				usuarioParaAutenticar.setId(usuarioExistente.getIdUsuario());
				usuarioParaAutenticar.setNome(usuarioExistente.getNome());
				usuarioParaAutenticar.setSenha(usuarioExistente.getSenha());
				return Optional.ofNullable(usuarioParaAutenticar); // Usuario Credenciado

			} else {
				return Optional.empty(); // Senha esteja incorreta
			}

		}).orElseGet(() -> {
			return Optional.empty(); // Email não existente
		});
	}
	
	public Optional<?> alterarUsuario(UsuarioDTO usuarioParaAlterar) {
		return repositorio.findById(usuarioParaAlterar.getId()).map(usuarioExistente -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String senhaCriptografada = encoder.encode(usuarioParaAlterar.getSenha());

			usuarioExistente.setNome(usuarioParaAlterar.getNome());
			usuarioExistente.setSenha(senhaCriptografada);
			return Optional.ofNullable(repositorio.save(usuarioExistente));
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}
}
