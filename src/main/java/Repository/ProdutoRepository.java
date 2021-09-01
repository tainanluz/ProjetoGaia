package Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecommerce.ecommerce.model.Produto;

@Repository

public interface ProdutoRepository extends JpaRepository <Produto,Long> {

	List<Produto> findAllByNomeContainingIgnoreCase(String nome);
		
}
