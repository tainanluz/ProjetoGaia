package Controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.ecommerce.model.Categoria;
import Repository.CategoriaRepository;


@RestController
@RequestMapping("/categoria")

public class CategoriaController {
	private @Autowired CategoriaRepository repository;
	
	@GetMapping("/getall")
    public ResponseEntity<List<Categoria>> GetAll() {
        List<Categoria> objetoLista = repository.findAll();

        if (objetoLista.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(200).body(objetoLista);
        }

    }
	
	@GetMapping("/{idCategoria}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable(value = "idCategoria") Long idCategoria){
        Optional<Categoria> objetoCategoria = repository.findById(idCategoria);

        if (objetoCategoria.isPresent()) {
            return ResponseEntity.status(200).body(objetoCategoria.get());
        } else {
            return ResponseEntity.status(204).build();
        }
    }
	/*@PutMapping("/Atualiza/Categoria/{AtualizaCat}")
    public ResponseEntity<@Valid Categoria> AtualizarCategoria (@Valid @RequestBody Categoria BodyCategoria, @PathVariable(value = "AtualizaCat")Long AtualizaCat)
    {
        if(Repositorio.existsById(AtualizaCat)!=false && AtualizaCat==BodyCategoria.getID())
        {
            return ResponseEntity.status(201).body(Repository.save(BodyCategoria));
        }else
        {
            return ResponseEntity.status(203).build();
        } 
    }*/
	@PostMapping("/salvar")
    public void SalvarCategoria(@Valid @RequestBody Categoria BodyCategoria)
    {
        ResponseEntity.status(201).body(repository.save(BodyCategoria)); 
    }
    @PutMapping("/put")
    public ResponseEntity<Categoria> atualizar(@Valid @RequestBody Categoria putCategoria) {
        return ResponseEntity.status(201).body(repository.save(putCategoria));
    }

    @DeleteMapping("/deletar/{idCategoria}")
    public void deleteById(@PathVariable(value = "idCategoria") Long idCategoria) {
        repository.deleteById(idCategoria);
    }

}
