package Ecommerce.Ecommerce.Servicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Ecommerce.Ecommerce.Repository.ProdutosRepository;

@Service
public class ProdutosServicos 
{
	@Autowired ProdutosRepository repositorio;
	
}
