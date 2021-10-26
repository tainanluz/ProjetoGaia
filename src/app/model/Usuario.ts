import { Produtos } from "./Produtos"

export class Usuario{
    public idUsuario: number
    public nome: string
    public email: string
    public senha: string
    public produtos: Produtos[]
}