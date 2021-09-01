package com.ecommerce.ecommerce.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecommerce.ecommerce.model.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository <Categoria,Long>{

	List<Categoria> findAllByJardinagemContainingIgnoreCase(String jardinagem);
	
}
