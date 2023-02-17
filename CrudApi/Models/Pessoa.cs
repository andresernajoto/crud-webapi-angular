using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudApi.Models
{
    public class Pessoa
    {
        public int PessoaId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Sobrenome { get; set; } = string.Empty;
        public int Idade { get; set; }
        public string Profissao { get; set; } = string.Empty;
    }
}