package Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
	private @Autowired ProdutoRepository repository;
	

}
