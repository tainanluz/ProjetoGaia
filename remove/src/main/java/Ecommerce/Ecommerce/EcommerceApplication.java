package Ecommerce.Ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RequestMapping("/")
@RestController
@CrossOrigin("*")
public class EcommerceApplication {
	
	@Autowired 
	
	
	@RequestMapping 
	public String BoasVindes()
	{
		return ("<h1>Bem vindes a loja Ecommerce!</h1>");
	}

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);

	}

}
