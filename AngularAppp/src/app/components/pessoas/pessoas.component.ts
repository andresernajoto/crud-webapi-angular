import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  formulario: any;
  tituloFormulario!: string;
  pessoas!: Pessoa[];

  nomePessoa!: string;
  pessoaId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  
  modalRef!: BsModalRef;

  constructor(private pessoasService: PessoasService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.pessoasService.GetAll().subscribe(result => {
      this.pessoas = result
    })
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tituloFormulario = "Cadastrar Pessoa";
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null),
    }); 
  }

  ExibirFormularioAtualizado(pessoaId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.GetById(pessoaId).subscribe(result => {
      this.tituloFormulario = 'Atualizar Pessoa';

      this.formulario = new FormGroup({
        pessoaId: new FormControl(result.pessoaId),
        nome: new FormControl(result.nome),
        sobrenome: new FormControl(result.sobrenome),
        idade: new FormControl(result.idade),
        profissao: new FormControl(result.profissao),
      });
    });
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId > 0) {
      this.pessoasService.PutPessoa(pessoa).subscribe(result => {
        this.visibilidadeTabela = true;
        this.visibilidadeFormulario = false;
        
        alert('Pessoa atualizada com sucesso!')
        this.pessoasService.GetAll().subscribe(regis => { this.pessoas = regis })
      })
    }
    else {
      this.pessoasService.PostPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
  
        alert('Pessoa inserida com sucesso!');
        this.pessoasService.GetAll().subscribe(regis => { this.pessoas = regis; })
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(pessoaId: number, nomePessoa: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  DeletePessoa(pessoaId: number) {
    this.pessoasService.DeletePessoa(pessoaId).subscribe(result => {
      this.modalRef.hide();
      
      alert('Pessoa excluida com sucesso!');
      this.pessoasService.GetAll().subscribe(regis => { this.pessoas = regis });
    })
  }
}
