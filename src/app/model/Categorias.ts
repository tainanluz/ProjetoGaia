import { Produtos } from "./Produtos"
import { Usuario } from "./Usuario"

export class Categorias {
    public idCategoria: number
    public nomeDaCategoria: string
    public descricaoDaCategoria: string
    public produtos: Produtos[]
    public usuario: Usuario
}