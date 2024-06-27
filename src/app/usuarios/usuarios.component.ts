import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  formularioUsuario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    edad: new FormControl('', [Validators.required]),
    dpi: new FormControl('', [Validators.required]),
  });
  listaUsuarios: any[] = [];
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorageUsuarios = document.defaultView?.localStorage;

    this.listaUsuarios = [];
    let datos = localStorageUsuarios?.getItem('usuarios');
    if (datos != null) {
      let arreglo = JSON.parse(datos);
      if (arreglo != null) {
        for (let usr of arreglo) {
          this.listaUsuarios.push(usr);
        }
      }
    }
  }

  enviarFormulario() {
    if (this.formularioUsuario.valid) {
      //Guardar en localStorage
      let lsusuarios = {
        id: this.listaUsuarios.length + 1,
        nombre: this.formularioUsuario.value.nombre!,
        edad: this.formularioUsuario.value.edad!,
        dpi: this.formularioUsuario.value.dpi!,
      };
      //alert(lsusuarios.nombre);
      this.listaUsuarios.push(lsusuarios);
      //guardar en localStorage
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.formularioUsuario.reset();
    } else {
      alert('Formulario inválido');
    }
  }
  llenarFormulario() {}
  editarUsuario(id: number) {
    let usuario = this.listaUsuarios.find((x) => x.id == id);
    this.formularioUsuario.setValue({
      nombre: usuario.nombre,
      edad: usuario.edad,
      dpi: usuario.dpi,
    });
    this.eliminarUsuario(usuario);
  }
  eliminarUsuario(usuario: any) {
    let indice = this.listaUsuarios.indexOf(usuario);
    this.listaUsuarios.splice(indice, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
  }
}
