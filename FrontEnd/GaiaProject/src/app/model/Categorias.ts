import { Produtos } from "./Produtos"

export class Categoria {
    public idCategoria: number
    public nomeDaCategoria: string
    public descricaoDaCategoria: string
    public produto: Produtos[]
}