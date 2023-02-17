using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly Contexto _context;

        public PessoasController(Contexto context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAllAsync() {
            return await _context.Pessoas.ToListAsync();
        }

        [HttpGet("{pessoaId}")]
        public async Task<ActionResult<Pessoa>> GetPessoaByIdAsync(int pessoaId) {
            Pessoa pessoa = await _context.Pessoas.FindAsync(pessoaId);

            if (pessoa == null) { return NotFound();}

            return pessoa;
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> PostPessoaAsync(Pessoa pessoa) {
            await _context.Pessoas.AddAsync(pessoa);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> PutPessoaAsync(Pessoa pessoa) {
            _context.Pessoas.Update(pessoa);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{pessoaId}")]
        public async Task<ActionResult> DeletePessoaAsync(int pessoaId) {
            Pessoa pessoa = await _context.Pessoas.FindAsync(pessoaId);

            if (pessoa == null) { return NotFound(); }
            
            _context.Remove(pessoa);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}