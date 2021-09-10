package Ecommerce.Ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Ecommerce.Ecommerce.Model.Categorias;



@Repository
public interface CategoryRepository extends JpaRepository<Categorias, Long>
{
	public List<Categorias> findAllByNomeDaCategoriaContainingIgnoreCase(String nomeDaCategoria);
}
 